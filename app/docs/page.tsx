"use client"

import { PageTitle } from "@/components/page-title"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function DocsPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <PageTitle title="Documentation" description="Learn about Algorand and blockchain concepts" />

        <Tabs defaultValue="algorand" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="algorand">Algorand</TabsTrigger>
            <TabsTrigger value="asa">ASAs</TabsTrigger>
            <TabsTrigger value="smart-contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="simulator">Simulator Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="algorand" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">What is Algorand?</h3>
                <p className="mb-4">
                  Algorand is a blockchain platform designed to create a borderless economy through its decentralized,
                  permissionless public blockchain. It was founded by Turing Award-winning cryptographer Silvio Micali
                  and launched in 2019.
                </p>
                <p className="mb-4">Key features of Algorand include:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Pure Proof-of-Stake (PPoS) consensus mechanism</li>
                  <li>High transaction throughput (1000+ TPS)</li>
                  <li>Low transaction fees</li>
                  <li>Carbon-negative blockchain</li>
                  <li>Immediate transaction finality</li>
                </ul>
                <p>
                  Algorand solves the blockchain trilemma by providing security, scalability, and decentralization
                  without compromising any of these aspects.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="asa" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Algorand Standard Assets (ASAs)</h3>
                <p className="mb-4">
                  Algorand Standard Assets (ASAs) are standardized, on-chain assets that represent new or existing
                  tokens on the Algorand blockchain. They can represent any type of asset, including cryptocurrencies,
                  stablecoins, loyalty points, system credits, and in-game points.
                </p>
                <p className="mb-4">Key features of ASAs include:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Role-Based Asset Control (RBAC)</li>
                  <li>Flexible asset parameters</li>
                  <li>Optional asset freezing</li>
                  <li>Optional asset clawback</li>
                  <li>Unified asset creation and management</li>
                </ul>
                <p>
                  ASAs are created through a simple transaction on the Algorand blockchain, making it easy for anyone to
                  create and manage their own tokens.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="smart-contracts" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Smart Contracts on Algorand</h3>
                <p className="mb-4">Algorand supports two types of smart contracts:</p>
                <h4 className="text-xl font-semibold mb-2">1. Stateless Smart Contracts</h4>
                <p className="mb-4">
                  These are simple logic programs that approve or reject transactions based on predefined conditions.
                  They don't store state between executions.
                </p>
                <h4 className="text-xl font-semibold mb-2">2. Stateful Smart Contracts</h4>
                <p className="mb-4">
                  These can read and write to global and local state, enabling more complex applications like
                  decentralized exchanges, voting systems, and more.
                </p>
                <p className="mb-4">
                  Algorand smart contracts are written in a language called TEAL (Transaction Execution Approval
                  Language) or using PyTeal, a Python library that generates TEAL code.
                </p>
                <p>
                  Smart contracts on Algorand are deterministic, meaning they always produce the same result given the
                  same input, making them predictable and secure.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="simulator" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">How to Use This Simulator</h3>
                <p className="mb-4">
                  This simulator is designed to help you understand blockchain concepts through hands-on experience
                  without needing real cryptocurrency or blockchain connections.
                </p>
                <h4 className="text-xl font-semibold mb-2">Getting Started</h4>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li>Create a simulated wallet from the dashboard</li>
                  <li>Explore the asset creation page to mint your own tokens</li>
                  <li>Use the transfer page to send assets between wallets</li>
                  <li>Try creating simple smart contracts</li>
                  <li>Watch the blockchain visualizer to see how blocks are formed</li>
                </ol>
                <p className="mb-4">
                  All data is stored locally in your browser and can be exported/imported for sharing or backup.
                </p>
                <p>
                  This simulator is for educational purposes only and does not involve real blockchain transactions or
                  assets.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  )
}
