"use client"

import { useBlockchain } from "@/context/blockchain-context"
import { truncateString, formatDate } from "@/lib/blockchain-utils"
import type { Asset } from "@/context/blockchain-context"

interface AssetTransactionsProps {
  asset: Asset
}

function formatNumber(amount: number): string {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function AssetTransactions({ asset }: AssetTransactionsProps) {
  const { wallets } = useBlockchain()

  if (asset.transactions.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No transactions found for this asset.</div>
  }

  return (
    <div className="border rounded-lg divide-y">
      {asset.transactions.map((tx, index) => {
        const fromWallet = wallets.find((w) => w.address === tx.from)
        const toWallet = wallets.find((w) => w.address === tx.to)

        return (
          <div key={index} className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">
                {formatNumber(tx.amount)} {asset.symbol}
              </p>
              <p className="text-xs text-muted-foreground">{formatDate(tx.timestamp)}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p>{fromWallet?.name || truncateString(tx.from, 6, 4)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">To</p>
                <p>{toWallet?.name || truncateString(tx.to, 6, 4)}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">Transaction Hash</p>
              <p className="text-xs font-mono">{truncateString(tx.hash, 12, 12)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
