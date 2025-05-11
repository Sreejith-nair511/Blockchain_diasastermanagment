"use client"

import { motion } from "framer-motion"
import { useBlockchain } from "@/context/blockchain-context"
import { formatNumber } from "@/lib/blockchain-utils"
import type { Wallet } from "@/context/blockchain-context"

interface WalletAssetsProps {
  wallet: Wallet
}

export function WalletAssets({ wallet }: WalletAssetsProps) {
  const { assets } = useBlockchain()

  // Get full asset details for the wallet's assets
  const walletAssets = wallet.assets.map((walletAsset) => {
    const assetDetails = assets.find((a) => a.assetId === walletAsset.assetId)
    return {
      ...walletAsset,
      details: assetDetails,
    }
  })

  if (walletAssets.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No assets in this wallet yet.</div>
  }

  return (
    <div className="space-y-4">
      {walletAssets.map((asset, index) => (
        <motion.div
          key={asset.assetId}
          className="p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">{asset.details?.symbol.substring(0, 2) || "AS"}</span>
              </div>
              <div>
                <h4 className="font-medium">{asset.details?.name || "Unknown Asset"}</h4>
                <p className="text-xs text-muted-foreground">{asset.details?.symbol || "???"}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatNumber(asset.amount)}</p>
              <p className="text-xs text-muted-foreground">
                {((asset.amount / (asset.details?.totalSupply || 1)) * 100).toFixed(2)}% of supply
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
