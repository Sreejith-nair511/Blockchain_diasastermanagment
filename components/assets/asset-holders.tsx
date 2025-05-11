"use client"

import { useBlockchain } from "@/context/blockchain-context"
import { truncateString, formatNumber } from "@/lib/blockchain-utils"
import type { Asset } from "@/context/blockchain-context"

interface AssetHoldersProps {
  asset: Asset
}

export function AssetHolders({ asset }: AssetHoldersProps) {
  const { wallets } = useBlockchain()

  if (asset.holders.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No holders found for this asset.</div>
  }

  return (
    <div className="border rounded-lg divide-y">
      {asset.holders.map((holder, index) => {
        const wallet = wallets.find((w) => w.address === holder.address)
        const percentage = (holder.amount / asset.totalSupply) * 100

        return (
          <div key={index} className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">
                {index + 1}
              </div>
              <div>
                <p className="font-medium">{wallet?.name || "Unknown Wallet"}</p>
                <p className="text-xs text-muted-foreground">{truncateString(holder.address, 6, 4)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatNumber(holder.amount)}</p>
              <p className="text-xs text-muted-foreground">{percentage.toFixed(2)}% of supply</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
