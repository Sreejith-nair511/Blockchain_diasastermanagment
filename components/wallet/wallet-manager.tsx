"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Wallet } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBlockchain } from "@/context/blockchain-context"
import { truncateString, formatNumber } from "@/lib/blockchain-utils"
import { WalletAssets } from "@/components/wallet/wallet-assets"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function WalletManager() {
  const { wallets, selectedWallet, createWallet, selectWallet } = useBlockchain()
  const [newWalletName, setNewWalletName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateWallet = () => {
    if (newWalletName.trim()) {
      createWallet(newWalletName.trim())
      setNewWalletName("")
      setIsDialogOpen(false)
    }
  }

  const selectedWalletObj = wallets.find((w) => w.id === selectedWallet)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Wallet Manager</span>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Wallet</DialogTitle>
                <DialogDescription>Create a simulated Algorand wallet for testing.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Wallet Name</Label>
                  <Input
                    id="name"
                    value={newWalletName}
                    onChange={(e) => setNewWalletName(e.target.value)}
                    placeholder="My Wallet"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreateWallet}>Create Wallet</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
        <CardDescription>Manage your simulated Algorand wallets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {wallets.map((wallet, index) => (
            <motion.div
              key={wallet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedWallet === wallet.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => selectWallet(wallet.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{wallet.name}</h3>
                    <p className="text-xs text-muted-foreground">{truncateString(wallet.address)}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="font-medium">{formatNumber(wallet.balance)} ALGO</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Assets</p>
                    <p className="font-medium">{wallet.assets.length}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedWalletObj && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Assets in {selectedWalletObj.name}</h3>
            <WalletAssets wallet={selectedWalletObj} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
