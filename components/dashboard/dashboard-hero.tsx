"use client"

import { motion } from "framer-motion"
import { useBlockchain } from "@/context/blockchain-context"
import { formatNumber } from "@/lib/blockchain-utils"

export function DashboardHero() {
  const { wallets, assets, transactions, blocks } = useBlockchain()

  const stats = [
    { name: "Wallets", value: wallets.length },
    { name: "Assets", value: assets.length },
    { name: "Transactions", value: transactions.length },
    { name: "Blocks", value: blocks.length },
  ]

  return (
    <motion.div
      className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 pb-2 pt-6">
        <h3 className="text-2xl font-bold tracking-tight">Algorand Blockchain Simulator</h3>
        <p className="text-sm text-muted-foreground">An educational tool for learning blockchain concepts</p>
      </div>
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              className="rounded-lg border p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-sm font-medium text-muted-foreground">{stat.name}</div>
              <div className="text-2xl font-bold">{formatNumber(stat.value)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
