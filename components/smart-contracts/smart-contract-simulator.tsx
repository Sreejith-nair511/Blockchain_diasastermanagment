"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Play } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBlockchain } from "@/context/blockchain-context"
import { formatDate } from "@/lib/blockchain-utils"

export function SmartContractSimulator() {
  const { smartContracts, createSmartContract, deploySmartContract } = useBlockchain()

  const [contractName, setContractName] = useState("")
  const [contractCode, setContractCode] = useState(
    `// Simple Algorand Smart Contract
// This is a simulated TEAL-like syntax

// Check if sender has minimum balance
txn.sender.balance >= 100000

// Check if asset transfer amount is valid
txn.asset.amount > 0

// Approve transaction if conditions are met
APPROVE
`,
  )

  const [selectedContract, setSelectedContract] = useState<string | null>(null)
  const [isDeploying, setIsDeploying] = useState(false)

  const handleCreateContract = () => {
    if (contractName.trim() && contractCode.trim()) {
      createSmartContract(contractName.trim(), contractCode.trim())
      setContractName("")
      setContractCode(
        `// Simple Algorand Smart Contract
// This is a simulated TEAL-like syntax

// Check if sender has minimum balance
txn.sender.balance >= 100000

// Check if asset transfer amount is valid
txn.asset.amount > 0

// Approve transaction if conditions are met
APPROVE
`,
      )
    }
  }

  const handleDeployContract = async () => {
    if (selectedContract) {
      setIsDeploying(true)
      await deploySmartContract(selectedContract)
      setIsDeploying(false)
    }
  }

  const selectedContractDetails = smartContracts.find((c) => c.id === selectedContract)

  return (
    <Tabs defaultValue="create" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="create">Create Contract</TabsTrigger>
        <TabsTrigger value="deploy">Deploy Contract</TabsTrigger>
      </TabsList>

      <TabsContent value="create">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contractName">Contract Name</Label>
                <Input
                  id="contractName"
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                  placeholder="My Smart Contract"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contractCode">Contract Code</Label>
                <div className="relative">
                  <Textarea
                    id="contractCode"
                    value={contractCode}
                    onChange={(e) => setContractCode(e.target.value)}
                    className="font-mono h-64 resize-none"
                  />
                  <div className="absolute top-2 right-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Write pseudo-TEAL code for your smart contract. This is a simplified simulation.
                </p>
              </div>

              <Button
                onClick={handleCreateContract}
                disabled={!contractName.trim() || !contractCode.trim()}
                className="w-full"
              >
                Create Smart Contract
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="deploy">
        <Card>
          <CardContent className="pt-6">
            {smartContracts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No smart contracts created yet. Create one first.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {smartContracts.map((contract, index) => (
                    <motion.div
                      key={contract.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedContract === contract.id ? "border-primary bg-primary/10" : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedContract(contract.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{contract.name}</h3>
                        <div
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            contract.status === "deployed"
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : contract.status === "failed"
                                ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                          }`}
                        >
                          {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Created: {formatDate(contract.createdAt)}
                      </div>
                      {contract.deployedAt && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          Deployed: {formatDate(contract.deployedAt)}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {selectedContractDetails && (
                  <motion.div
                    className="border rounded-lg p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-medium mb-2">Contract Code</h3>
                    <pre className="bg-muted p-4 rounded-md text-xs font-mono overflow-x-auto">
                      {selectedContractDetails.code}
                    </pre>

                    {selectedContractDetails.status === "draft" && (
                      <Button onClick={handleDeployContract} className="mt-4 w-full" disabled={isDeploying}>
                        {isDeploying ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Deploying...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Play className="mr-2 h-4 w-4" />
                            Deploy Contract
                          </span>
                        )}
                      </Button>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
