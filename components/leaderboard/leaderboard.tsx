"use client"

import { motion } from "framer-motion"
import { Award, TrendingUp, Coins, FileCode } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { useBlockchain } from "@/context/blockchain-context"
import { truncateString } from "@/lib/blockchain-utils"

export function Leaderboard() {
  const { getLeaderboard } = useBlockchain()

  const leaderboardData = getLeaderboard()

  if (leaderboardData.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8 text-muted-foreground">
            No wallet activity yet. Create wallets and start transacting to appear on the leaderboard.
          </div>
        </CardContent>
      </Card>
    )
  }

  // Find the highest score for scaling
  const maxScore = Math.max(...leaderboardData.map((item) => item.score))

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {leaderboardData.map((item, index) => {
            const scorePercentage = (item.score / maxScore) * 100

            return (
              <motion.div
                key={item.address}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-primary/10 rounded-l-lg"
                  style={{ width: `${scorePercentage}%` }}
                />

                <div className="relative flex items-center p-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                            ? "bg-gray-400"
                            : index === 2
                              ? "bg-amber-700"
                              : "bg-primary/70"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{truncateString(item.address, 6, 4)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden md:block text-center">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Coins className="h-3 w-3" />
                        Assets
                      </div>
                      <p className="font-medium">{item.assetsCreated}</p>
                    </div>

                    <div className="hidden md:block text-center">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        Transfers
                      </div>
                      <p className="font-medium">{item.transfersCount}</p>
                    </div>

                    <div className="hidden md:block text-center">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileCode className="h-3 w-3" />
                        Contracts
                      </div>
                      <p className="font-medium">{item.contractsDeployed}</p>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Award className="h-3 w-3" />
                        Score
                      </div>
                      <p className="font-bold">{item.score}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
