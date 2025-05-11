"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Clock, Hash, Layers } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBlockchain } from "@/context/blockchain-context"
import { truncateString, formatDate } from "@/lib/blockchain-utils"

export function BlockchainVisualizer() {
  const { blocks, transactions } = useBlockchain()
  const [expanded, setExpanded] = useState(false)

  // Show only the latest 5 blocks unless expanded
  const visibleBlocks = expanded ? blocks : blocks.slice(-5).reverse()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Blockchain Visualizer</span>
          <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Show More
              </>
            )}
          </Button>
        </CardTitle>
        <CardDescription>Visual representation of the blockchain structure</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {visibleBlocks.map((block, index) => (
            <motion.div
              key={block.id}
              className="blockchain-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Block #{block.height}</h3>
                </div>
                <div className="text-xs text-muted-foreground">{formatDate(block.timestamp)}</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Hash className="h-3 w-3" />
                    Hash
                  </div>
                  <div className="font-mono text-xs truncate">{truncateString(block.hash, 10, 10)}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Hash className="h-3 w-3" />
                    Previous Hash
                  </div>
                  <div className="font-mono text-xs truncate">
                    {block.previousHash ? truncateString(block.previousHash, 10, 10) : "Genesis Block"}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3 w-3" />
                  Transactions ({block.transactions.length})
                </div>
                {block.transactions.length > 0 ? (
                  <div className="space-y-2">
                    {block.transactions.map((txId) => {
                      const tx = transactions.find((t) => t.id === txId)
                      if (!tx) return null

                      return (
                        <div key={txId} className="text-xs p-2 rounded bg-muted/50">
                          <div className="flex items-center justify-between">
                            <div className="font-mono truncate max-w-[150px]">{truncateString(tx.hash, 6, 6)}</div>
                            <div>
                              {tx.amount} {tx.assetId ? "ASA" : "ALGO"}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">No transactions in this block</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
