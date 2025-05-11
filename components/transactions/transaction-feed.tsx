"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBlockchain } from "@/context/blockchain-context"
import { truncateString, timeAgo } from "@/lib/blockchain-utils"

export function TransactionFeed() {
  const { transactions, assets } = useBlockchain()
  const [visibleTransactions, setVisibleTransactions] = useState<typeof transactions>([])

  // Sort transactions by timestamp (newest first) and take the latest 10
  useEffect(() => {
    const sorted = [...transactions]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)

    setVisibleTransactions(sorted)
  }, [transactions])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Transaction Feed</CardTitle>
        <CardDescription>Recent transactions on the simulated blockchain</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {visibleTransactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No transactions yet.</div>
          ) : (
            visibleTransactions.map((tx, index) => {
              const asset = assets.find((a) => a.assetId === tx.assetId)

              return (
                <motion.div
                  key={tx.id}
                  className="p-3 rounded-lg border text-sm relative overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {index === 0 && <div className="absolute bottom-0 left-0 right-0 h-1 transaction-animation" />}
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-muted-foreground">{timeAgo(tx.timestamp)}</div>
                    <div className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {tx.blockId ? "Confirmed" : "Pending"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs truncate max-w-[80px]">{truncateString(tx.from, 4, 4)}</div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <div className="text-xs truncate max-w-[80px]">{truncateString(tx.to, 4, 4)}</div>
                  </div>
                  <div className="mt-1 font-medium">
                    {tx.amount} {asset?.symbol || "ALGO"}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground truncate">TX: {truncateString(tx.hash, 6, 6)}</div>
                </motion.div>
              )
            })
          )}
        </div>
        <div className="mt-4 overflow-hidden">
          <div className="ticker-animation whitespace-nowrap text-xs text-muted-foreground">
            {transactions.slice(0, 20).map((tx, i) => (
              <span key={i} className="inline-block mx-4">
                {truncateString(tx.hash, 6, 6)} • {tx.amount}{" "}
                {assets.find((a) => a.assetId === tx.assetId)?.symbol || "ALGO"}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
