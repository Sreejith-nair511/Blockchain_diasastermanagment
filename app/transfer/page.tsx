"use client"

import { PageTitle } from "@/components/page-title"
import { TransferSimulator } from "@/components/transfer/transfer-simulator"
import { motion } from "framer-motion"

export default function TransferPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <PageTitle title="Transfer Assets" description="Simulate transferring assets between wallets" />

        <div className="mt-6">
          <TransferSimulator />
        </div>
      </motion.div>
    </main>
  )
}
