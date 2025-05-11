"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { generateRandomAddress, generateRandomHash } from "@/lib/blockchain-utils"
import { useToast } from "@/components/ui/use-toast"

export interface Wallet {
  id: string
  address: string
  name: string
  balance: number
  assets: {
    assetId: string
    amount: number
  }[]
  createdAt: string
}

export interface Asset {
  id: string
  assetId: string
  name: string
  symbol: string
  totalSupply: number
  decimals: number
  creator: string
  createdAt: string
  holders: {
    address: string
    amount: number
  }[]
  transactions: Transaction[]
}

export interface Transaction {
  id: string
  hash: string
  from: string
  to: string
  amount: number
  assetId: string | null
  timestamp: string
  blockId: string | null
}

export interface Block {
  id: string
  hash: string
  previousHash: string | null
  timestamp: string
  transactions: string[]
  height: number
}

export interface SmartContract {
  id: string
  name: string
  creator: string
  code: string
  createdAt: string
  deployedAt: string | null
  status: "draft" | "deployed" | "failed"
}

interface BlockchainState {
  wallets: Wallet[]
  assets: Asset[]
  transactions: Transaction[]
  blocks: Block[]
  smartContracts: SmartContract[]
  selectedWallet: string | null
}

interface BlockchainContextType extends BlockchainState {
  createWallet: (name: string) => void
  selectWallet: (id: string) => void
  createAsset: (asset: Omit<Asset, "id" | "assetId" | "createdAt" | "holders" | "transactions">) => void
  transferAsset: (from: string, to: string, assetId: string, amount: number) => Promise<boolean>
  createSmartContract: (name: string, code: string) => void
  deploySmartContract: (id: string) => Promise<boolean>
  generateTransaction: () => void
  exportState: () => string
  importState: (state: string) => void
  getLeaderboard: () => {
    address: string
    name: string
    score: number
    assetsCreated: number
    transfersCount: number
    contractsDeployed: number
  }[]
}

const initialState: BlockchainState = {
  wallets: [],
  assets: [],
  transactions: [],
  blocks: [],
  smartContracts: [],
  selectedWallet: null,
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined)

export function BlockchainProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BlockchainState>(initialState)
  const { toast } = useToast()

  // Load state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem("blockchainState")
    if (savedState) {
      try {
        setState(JSON.parse(savedState))
      } catch (error) {
        console.error("Failed to parse saved state:", error)
      }
    } else {
      // Initialize with demo data if no saved state
      initializeDemoData()
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("blockchainState", JSON.stringify(state))
  }, [state])

  // Initialize demo data for first-time users
  const initializeDemoData = () => {
    const demoWallet = {
      id: "demo-wallet-1",
      address: generateRandomAddress(),
      name: "Demo Wallet",
      balance: 100,
      assets: [],
      createdAt: new Date().toISOString(),
    }

    const demoAsset = {
      id: "demo-asset-1",
      assetId: generateRandomHash(),
      name: "AlgoEdu Token",
      symbol: "AET",
      totalSupply: 1000000,
      decimals: 6,
      creator: demoWallet.address,
      createdAt: new Date().toISOString(),
      holders: [
        {
          address: demoWallet.address,
          amount: 1000000,
        },
      ],
      transactions: [],
    }

    const updatedWallet = {
      ...demoWallet,
      assets: [
        {
          assetId: demoAsset.assetId,
          amount: 1000000,
        },
      ],
    }

    const genesisBlock = {
      id: "genesis-block",
      hash: generateRandomHash(),
      previousHash: null,
      timestamp: new Date().toISOString(),
      transactions: [],
      height: 0,
    }

    setState({
      ...initialState,
      wallets: [updatedWallet],
      assets: [demoAsset],
      blocks: [genesisBlock],
      selectedWallet: demoWallet.id,
    })
  }

  // Create a new wallet
  const createWallet = useCallback(
    (name: string) => {
      const newWallet: Wallet = {
        id: `wallet-${Date.now()}`,
        address: generateRandomAddress(),
        name,
        balance: 100, // Start with 100 Algos
        assets: [],
        createdAt: new Date().toISOString(),
      }

      setState((prev) => ({
        ...prev,
        wallets: [...prev.wallets, newWallet],
        selectedWallet: newWallet.id,
      }))

      toast({
        title: "Wallet Created",
        description: `${name} wallet has been created successfully.`,
      })
    },
    [toast],
  )

  // Select a wallet
  const selectWallet = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      selectedWallet: id,
    }))
  }, [])

  // Create a new asset
  const createAsset = useCallback(
    (assetData: Omit<Asset, "id" | "assetId" | "createdAt" | "holders" | "transactions">) => {
      const newAsset: Asset = {
        id: `asset-${Date.now()}`,
        assetId: generateRandomHash(),
        ...assetData,
        createdAt: new Date().toISOString(),
        holders: [
          {
            address: assetData.creator,
            amount: assetData.totalSupply,
          },
        ],
        transactions: [],
      }

      // Update the creator's wallet with the new asset
      setState((prev) => {
        const updatedWallets = prev.wallets.map((wallet) => {
          if (wallet.address === assetData.creator) {
            return {
              ...wallet,
              assets: [
                ...wallet.assets,
                {
                  assetId: newAsset.assetId,
                  amount: assetData.totalSupply,
                },
              ],
            }
          }
          return wallet
        })

        return {
          ...prev,
          assets: [...prev.assets, newAsset],
          wallets: updatedWallets,
        }
      })

      toast({
        title: "Asset Created",
        description: `${assetData.name} (${assetData.symbol}) has been created successfully.`,
      })
    },
    [toast],
  )

  // Transfer asset between wallets
  const transferAsset = useCallback(
    async (from: string, to: string, assetId: string, amount: number): Promise<boolean> => {
      // Validate the transfer
      const fromWallet = state.wallets.find((w) => w.address === from)
      const toWallet = state.wallets.find((w) => w.address === to)
      const asset = state.assets.find((a) => a.assetId === assetId)

      if (!fromWallet || !toWallet || !asset) {
        toast({
          title: "Transfer Failed",
          description: "Invalid wallet or asset.",
          variant: "destructive",
        })
        return false
      }

      const fromAsset = fromWallet.assets.find((a) => a.assetId === assetId)
      if (!fromAsset || fromAsset.amount < amount) {
        toast({
          title: "Transfer Failed",
          description: "Insufficient balance.",
          variant: "destructive",
        })
        return false
      }

      // Create transaction
      const transaction: Transaction = {
        id: `tx-${Date.now()}`,
        hash: generateRandomHash(),
        from,
        to,
        amount,
        assetId,
        timestamp: new Date().toISOString(),
        blockId: null, // Will be assigned when included in a block
      }

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update state
      setState((prev) => {
        // Update wallets
        const updatedWallets = prev.wallets.map((wallet) => {
          if (wallet.address === from) {
            const updatedAssets = wallet.assets.map((a) => {
              if (a.assetId === assetId) {
                return { ...a, amount: a.amount - amount }
              }
              return a
            })
            return { ...wallet, assets: updatedAssets }
          }
          if (wallet.address === to) {
            const existingAsset = wallet.assets.find((a) => a.assetId === assetId)
            if (existingAsset) {
              const updatedAssets = wallet.assets.map((a) => {
                if (a.assetId === assetId) {
                  return { ...a, amount: a.amount + amount }
                }
                return a
              })
              return { ...wallet, assets: updatedAssets }
            } else {
              return {
                ...wallet,
                assets: [...wallet.assets, { assetId, amount }],
              }
            }
          }
          return wallet
        })

        // Update asset holders
        const updatedAssets = prev.assets.map((a) => {
          if (a.assetId === assetId) {
            let updatedHolders = [...a.holders]

            // Update sender
            const senderIndex = updatedHolders.findIndex((h) => h.address === from)
            if (senderIndex >= 0) {
              const newAmount = updatedHolders[senderIndex].amount - amount
              if (newAmount > 0) {
                updatedHolders[senderIndex] = { ...updatedHolders[senderIndex], amount: newAmount }
              } else {
                updatedHolders = updatedHolders.filter((_, i) => i !== senderIndex)
              }
            }

            // Update receiver
            const receiverIndex = updatedHolders.findIndex((h) => h.address === to)
            if (receiverIndex >= 0) {
              updatedHolders[receiverIndex] = {
                ...updatedHolders[receiverIndex],
                amount: updatedHolders[receiverIndex].amount + amount,
              }
            } else {
              updatedHolders.push({ address: to, amount })
            }

            return {
              ...a,
              holders: updatedHolders,
              transactions: [...a.transactions, transaction],
            }
          }
          return a
        })

        return {
          ...prev,
          wallets: updatedWallets,
          assets: updatedAssets,
          transactions: [...prev.transactions, transaction],
        }
      })

      // Add transaction to a block
      setTimeout(() => {
        addTransactionToBlock(transaction.id)
      }, 3000)

      toast({
        title: "Transfer Successful",
        description: `${amount} ${asset.symbol} transferred successfully.`,
      })

      return true
    },
    [state, toast],
  )

  // Add transaction to a block
  const addTransactionToBlock = useCallback((transactionId: string) => {
    setState((prev) => {
      const latestBlock = prev.blocks[prev.blocks.length - 1]
      const transaction = prev.transactions.find((t) => t.id === transactionId)

      if (!transaction) return prev

      // Create a new block if the latest block is more than 10 seconds old
      // or if it already has 5 transactions
      const shouldCreateNewBlock =
        Date.now() - new Date(latestBlock.timestamp).getTime() > 10000 || latestBlock.transactions.length >= 5

      if (shouldCreateNewBlock) {
        const newBlock: Block = {
          id: `block-${Date.now()}`,
          hash: generateRandomHash(),
          previousHash: latestBlock.hash,
          timestamp: new Date().toISOString(),
          transactions: [transactionId],
          height: latestBlock.height + 1,
        }

        const updatedTransactions = prev.transactions.map((t) =>
          t.id === transactionId ? { ...t, blockId: newBlock.id } : t,
        )

        return {
          ...prev,
          blocks: [...prev.blocks, newBlock],
          transactions: updatedTransactions,
        }
      } else {
        // Add to existing block
        const updatedBlocks = prev.blocks.map((block) => {
          if (block.id === latestBlock.id) {
            return {
              ...block,
              transactions: [...block.transactions, transactionId],
            }
          }
          return block
        })

        const updatedTransactions = prev.transactions.map((t) =>
          t.id === transactionId ? { ...t, blockId: latestBlock.id } : t,
        )

        return {
          ...prev,
          blocks: updatedBlocks,
          transactions: updatedTransactions,
        }
      }
    })
  }, [])

  // Create a smart contract
  const createSmartContract = useCallback(
    (name: string, code: string) => {
      const selectedWalletObj = state.wallets.find((w) => w.id === state.selectedWallet)

      if (!selectedWalletObj) {
        toast({
          title: "Contract Creation Failed",
          description: "Please select a wallet first.",
          variant: "destructive",
        })
        return
      }

      const newContract: SmartContract = {
        id: `contract-${Date.now()}`,
        name,
        creator: selectedWalletObj.address,
        code,
        createdAt: new Date().toISOString(),
        deployedAt: null,
        status: "draft",
      }

      setState((prev) => ({
        ...prev,
        smartContracts: [...prev.smartContracts, newContract],
      }))

      toast({
        title: "Smart Contract Created",
        description: `${name} has been created successfully.`,
      })
    },
    [state, toast],
  )

  // Deploy a smart contract
  const deploySmartContract = useCallback(
    async (id: string): Promise<boolean> => {
      const contract = state.smartContracts.find((c) => c.id === id)

      if (!contract) {
        toast({
          title: "Deployment Failed",
          description: "Contract not found.",
          variant: "destructive",
        })
        return false
      }

      // Simulate deployment delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Simple validation - just check if the code contains certain keywords
      const isValid = !contract.code.includes("ERROR") && contract.code.length > 10

      if (!isValid) {
        setState((prev) => ({
          ...prev,
          smartContracts: prev.smartContracts.map((c) => (c.id === id ? { ...c, status: "failed" } : c)),
        }))

        toast({
          title: "Deployment Failed",
          description: "Invalid contract code.",
          variant: "destructive",
        })
        return false
      }

      setState((prev) => ({
        ...prev,
        smartContracts: prev.smartContracts.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "deployed",
                deployedAt: new Date().toISOString(),
              }
            : c,
        ),
      }))

      toast({
        title: "Contract Deployed",
        description: `${contract.name} has been deployed successfully.`,
      })
      return true
    },
    [state, toast],
  )

  // Generate a random transaction for the live feed
  const generateTransaction = useCallback(() => {
    if (state.wallets.length < 2 || state.assets.length === 0) return

    // Pick random wallets and asset
    const wallets = [...state.wallets]
    const fromIndex = Math.floor(Math.random() * wallets.length)
    const fromWallet = wallets[fromIndex]
    wallets.splice(fromIndex, 1)
    const toWallet = wallets[Math.floor(Math.random() * wallets.length)]

    const assetWithHolders = state.assets.filter((a) =>
      a.holders.some((h) => h.address === fromWallet.address && h.amount > 0),
    )

    if (assetWithHolders.length === 0) return

    const asset = assetWithHolders[Math.floor(Math.random() * assetWithHolders.length)]
    const holder = asset.holders.find((h) => h.address === fromWallet.address)
    if (!holder) return

    const amount = Math.floor(Math.random() * Math.min(holder.amount, 100)) + 1

    // Create transaction
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      hash: generateRandomHash(),
      from: fromWallet.address,
      to: toWallet.address,
      amount,
      assetId: asset.assetId,
      timestamp: new Date().toISOString(),
      blockId: null,
    }

    // Update state
    setState((prev) => {
      // Update wallets
      const updatedWallets = prev.wallets.map((wallet) => {
        if (wallet.address === fromWallet.address) {
          const updatedAssets = wallet.assets.map((a) => {
            if (a.assetId === asset.assetId) {
              return { ...a, amount: a.amount - amount }
            }
            return a
          })
          return { ...wallet, assets: updatedAssets }
        }
        if (wallet.address === toWallet.address) {
          const existingAsset = wallet.assets.find((a) => a.assetId === asset.assetId)
          if (existingAsset) {
            const updatedAssets = wallet.assets.map((a) => {
              if (a.assetId === asset.assetId) {
                return { ...a, amount: a.amount + amount }
              }
              return a
            })
            return { ...wallet, assets: updatedAssets }
          } else {
            return {
              ...wallet,
              assets: [...wallet.assets, { assetId: asset.assetId, amount }],
            }
          }
        }
        return wallet
      })

      // Update asset holders
      const updatedAssets = prev.assets.map((a) => {
        if (a.assetId === asset.assetId) {
          let updatedHolders = [...a.holders]

          // Update sender
          const senderIndex = updatedHolders.findIndex((h) => h.address === fromWallet.address)
          if (senderIndex >= 0) {
            const newAmount = updatedHolders[senderIndex].amount - amount
            if (newAmount > 0) {
              updatedHolders[senderIndex] = { ...updatedHolders[senderIndex], amount: newAmount }
            } else {
              updatedHolders = updatedHolders.filter((_, i) => i !== senderIndex)
            }
          }

          // Update receiver
          const receiverIndex = updatedHolders.findIndex((h) => h.address === toWallet.address)
          if (receiverIndex >= 0) {
            updatedHolders[receiverIndex] = {
              ...updatedHolders[receiverIndex],
              amount: updatedHolders[receiverIndex].amount + amount,
            }
          } else {
            updatedHolders.push({ address: toWallet.address, amount })
          }

          return {
            ...a,
            holders: updatedHolders,
            transactions: [...a.transactions, transaction],
          }
        }
        return a
      })

      return {
        ...prev,
        wallets: updatedWallets,
        assets: updatedAssets,
        transactions: [...prev.transactions, transaction],
      }
    })

    // Add transaction to a block
    setTimeout(() => {
      addTransactionToBlock(transaction.id)
    }, 3000)
  }, [state, addTransactionToBlock])

  // Export state as JSON
  const exportState = useCallback(() => {
    return JSON.stringify(state)
  }, [state])

  // Import state from JSON
  const importState = useCallback(
    (stateJson: string) => {
      try {
        const parsedState = JSON.parse(stateJson)
        setState(parsedState)
        toast({
          title: "Import Successful",
          description: "Blockchain state has been imported successfully.",
        })
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Invalid state data.",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  // Get leaderboard data
  const getLeaderboard = useCallback(() => {
    return state.wallets
      .map((wallet) => {
        const assetsCreated = state.assets.filter((a) => a.creator === wallet.address).length
        const transfersCount = state.transactions.filter(
          (t) => t.from === wallet.address || t.to === wallet.address,
        ).length
        const contractsDeployed = state.smartContracts.filter(
          (c) => c.creator === wallet.address && c.status === "deployed",
        ).length

        // Calculate score based on activity
        const score = assetsCreated * 10 + transfersCount * 2 + contractsDeployed * 15

        return {
          address: wallet.address,
          name: wallet.name,
          score,
          assetsCreated,
          transfersCount,
          contractsDeployed,
        }
      })
      .sort((a, b) => b.score - a.score)
  }, [state])

  const contextValue = {
    ...state,
    createWallet,
    selectWallet,
    createAsset,
    transferAsset,
    createSmartContract,
    deploySmartContract,
    generateTransaction,
    exportState,
    importState,
    getLeaderboard,
  }

  return <BlockchainContext.Provider value={contextValue}>{children}</BlockchainContext.Provider>
}

export function useBlockchain() {
  const context = useContext(BlockchainContext)
  if (context === undefined) {
    throw new Error("useBlockchain must be used within a BlockchainProvider")
  }
  return context
}
