"use client"

import { useEffect } from "react"
import { useBlockchain } from "@/context/blockchain-context"

export function Analytics() {
  const { generateTransaction } = useBlockchain()

  useEffect(() => {
    // Generate random transactions every few seconds
    const interval = setInterval(() => {
      generateTransaction()
    }, 5000)

    return () => clearInterval(interval)
  }, [generateTransaction])

  return null
}
