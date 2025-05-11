"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useBlockchain } from "@/context/blockchain-context"
import { truncateString } from "@/lib/blockchain-utils"

export function TransferSimulator() {
  const { wallets, assets, transferAsset } = useBlockchain()

  const [formData, setFormData] = useState({
    fromWallet: "",
    toWallet: "",
    assetId: "",
    amount: 0,
  })

  const [isTransferring, setIsTransferring] = useState(false)
  const [transferSuccess, setTransferSuccess] = useState<boolean | null>(null)
  const [animateTransfer, setAnimateTransfer] = useState(false)

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Reset transfer status when form changes
    setTransferSuccess(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fromWallet || !formData.toWallet || !formData.assetId || !formData.amount) {
      return
    }

    setIsTransferring(true)
    setAnimateTransfer(true)

    const fromWallet = wallets.find((w) => w.id === formData.fromWallet)
    const toWallet = wallets.find((w) => w.id === formData.toWallet)

    if (!fromWallet || !toWallet) {
      setTransferSuccess(false)
      setIsTransferring(false)
      setAnimateTransfer(false)
      return
    }

    const success = await transferAsset(fromWallet.address, toWallet.address, formData.assetId, formData.amount)

    setTransferSuccess(success)
    setIsTransferring(false)

    // Reset animation after it completes
    setTimeout(() => {
      setAnimateTransfer(false)
    }, 2000)
  }

  // Get available assets for the selected wallet
  const availableAssets = formData.fromWallet
    ? assets.filter((asset) => {
        const wallet = wallets.find((w) => w.id === formData.fromWallet)
        if (!wallet) return false

        return wallet.assets.some((a) => a.assetId === asset.assetId && a.amount > 0)
      })
    : []

  // Get max amount for selected asset
  const maxAmount =
    formData.fromWallet && formData.assetId
      ? wallets.find((w) => w.id === formData.fromWallet)?.assets.find((a) => a.assetId === formData.assetId)?.amount ||
        0
      : 0

  const selectedAsset = assets.find((a) => a.assetId === formData.assetId)

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fromWallet">From Wallet</Label>
                <Select
                  value={formData.fromWallet}
                  onValueChange={(value) => handleChange("fromWallet", value)}
                  disabled={isTransferring}
                >
                  <SelectTrigger id="fromWallet">
                    <SelectValue placeholder="Select source wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets.map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        {wallet.name} ({truncateString(wallet.address, 4, 4)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="asset">Asset</Label>
                <Select
                  value={formData.assetId}
                  onValueChange={(value) => handleChange("assetId", value)}
                  disabled={isTransferring || !formData.fromWallet}
                >
                  <SelectTrigger id="asset">
                    <SelectValue placeholder="Select asset to transfer" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAssets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.assetId}>
                        {asset.name} ({asset.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="toWallet">To Wallet</Label>
                <Select
                  value={formData.toWallet}
                  onValueChange={(value) => handleChange("toWallet", value)}
                  disabled={isTransferring}
                >
                  <SelectTrigger id="toWallet">
                    <SelectValue placeholder="Select destination wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    {wallets
                      .filter((w) => w.id !== formData.fromWallet)
                      .map((wallet) => (
                        <SelectItem key={wallet.id} value={wallet.id}>
                          {wallet.name} ({truncateString(wallet.address, 4, 4)})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    max={maxAmount}
                    value={formData.amount || ""}
                    onChange={(e) => handleChange("amount", Number.parseInt(e.target.value) || 0)}
                    disabled={isTransferring || !formData.assetId}
                  />
                  {formData.assetId && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleChange("amount", maxAmount)}
                      disabled={isTransferring || !formData.assetId}
                    >
                      Max
                    </Button>
                  )}
                </div>
                {formData.assetId && (
                  <p className="text-xs text-muted-foreground">
                    Available: {maxAmount} {selectedAsset?.symbol}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="relative">
            {animateTransfer && <div className="transaction-animation" />}

            <div className="flex items-center justify-center gap-4 py-6">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">
                  {formData.fromWallet ? wallets.find((w) => w.id === formData.fromWallet)?.name.charAt(0) || "F" : "F"}
                </span>
              </div>
              <ArrowRight className="h-6 w-6 text-primary" />
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">
                  {formData.toWallet ? wallets.find((w) => w.id === formData.toWallet)?.name.charAt(0) || "T" : "T"}
                </span>
              </div>
            </div>
          </div>

          {transferSuccess !== null && (
            <motion.div
              className={`p-4 rounded-lg ${
                transferSuccess
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {transferSuccess
                ? `Successfully transferred ${formData.amount} ${selectedAsset?.symbol || "tokens"}`
                : "Transfer failed. Please check your inputs and try again."}
            </motion.div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={
              isTransferring ||
              !formData.fromWallet ||
              !formData.toWallet ||
              !formData.assetId ||
              !formData.amount ||
              formData.amount > maxAmount
            }
          >
            {isTransferring ? "Processing Transfer..." : "Transfer Assets"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
