"use client"

import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function TutorialModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisitedBefore")
    if (!hasVisited) {
      setIsOpen(true)
      localStorage.setItem("hasVisitedBefore", "true")
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Welcome to Algorand Simulator!</DialogTitle>
          <DialogDescription>An educational tool to learn blockchain concepts</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p>
            This simulator helps you understand blockchain technology and Algorand concepts through hands-on experience.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium">Getting Started:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Create a simulated wallet from the dashboard</li>
              <li>Mint your own assets in the Assets section</li>
              <li>Transfer assets between wallets</li>
              <li>Create simple smart contracts</li>
              <li>Watch the blockchain grow in real-time</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">
            All data is stored locally in your browser. No real blockchain or cryptocurrency is involved.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Get Started</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
