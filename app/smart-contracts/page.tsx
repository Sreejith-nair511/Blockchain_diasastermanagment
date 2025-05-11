"use client"

import { PageTitle } from "@/components/page-title"
import { SmartContractSimulator } from "@/components/smart-contracts/smart-contract-simulator"
import { motion } from "framer-motion"

export default function SmartContractsPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <PageTitle title="Smart Contracts" description="Create and deploy simulated smart contracts" />

        <div className="mt-6">
          <SmartContractSimulator />
        </div>
      </motion.div>
    </main>
  )
}
