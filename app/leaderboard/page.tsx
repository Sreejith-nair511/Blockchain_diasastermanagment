"use client"

import { PageTitle } from "@/components/page-title"
import { Leaderboard } from "@/components/leaderboard/leaderboard"
import { motion } from "framer-motion"

export default function LeaderboardPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <PageTitle title="Leaderboard" description="Top users by assets, transfers, and contracts" />

        <div className="mt-6">
          <Leaderboard />
        </div>
      </motion.div>
    </main>
  )
}
