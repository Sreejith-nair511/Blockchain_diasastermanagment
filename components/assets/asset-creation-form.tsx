"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useBlockchain } from "@/context/blockchain-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function AssetCreationForm() {
  const { createAsset, wallets, selectedWallet } = useBlockchain()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    totalSupply: 1000000,
    decimals: 6,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalSupply" || name === "decimals" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedWallet) {
      toast({
        title: "No Wallet Selected",
        description: "Please select a wallet to create an asset.",
        variant: "destructive",
      })
      return
    }

    const selectedWalletObj = wallets.find((w) => w.id === selectedWallet)
    if (!selectedWalletObj) return

    if (!formData.name || !formData.symbol) {
      toast({
        title: "Missing Information",
        description: "Please provide both name and symbol for your asset.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate processing delay
    setTimeout(() => {
      createAsset({
        ...formData,
        creator: selectedWalletObj.address,
      })

      // Reset form
      setFormData({
        name: "",
        symbol: "",
        totalSupply: 1000000,
        decimals: 6,
      })

      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="My Token"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="symbol">Asset Symbol</Label>
            <Input
              id="symbol"
              name="symbol"
              placeholder="TKN"
              value={formData.symbol}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="totalSupply">Total Supply</Label>
            <Input
              id="totalSupply"
              name="totalSupply"
              type="number"
              min="1"
              placeholder="1000000"
              value={formData.totalSupply}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="decimals">Decimals</Label>
            <Input
              id="decimals"
              name="decimals"
              type="number"
              min="0"
              max="19"
              placeholder="6"
              value={formData.decimals}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating Asset..." : "Create Asset"}
          </Button>
        </motion.form>
      </CardContent>
    </Card>
  )
}
