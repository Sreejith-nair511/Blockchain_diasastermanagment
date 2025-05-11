"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Eye } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useBlockchain } from "@/context/blockchain-context"
import { truncateString, formatNumber, formatDate } from "@/lib/blockchain-utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetHolders } from "@/components/assets/asset-holders"
import { AssetTransactions } from "@/components/assets/asset-transactions"

export function AssetExplorer() {
  const { assets, wallets } = useBlockchain()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCreator, setFilterCreator] = useState("")
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  // Filter assets based on search term and creator filter
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assetId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCreator = filterCreator ? asset.creator === filterCreator : true

    return matchesSearch && matchesCreator
  })

  const selectedAssetDetails = assets.find((a) => a.id === selectedAsset)

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, symbol or ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="outline"
                className="w-full md:w-auto"
                onClick={() => setFilterCreator(filterCreator ? "" : wallets[0]?.address || "")}
              >
                <Filter className="mr-2 h-4 w-4" />
                {filterCreator ? "Clear Filter" : "Filter by Creator"}
              </Button>
            </div>
          </div>

          {filteredAssets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No assets found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAssets.map((asset, index) => {
                const creator = wallets.find((w) => w.address === asset.creator)

                return (
                  <motion.div
                    key={asset.id}
                    className="border rounded-lg p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{asset.name}</h3>
                        <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedAsset(asset.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Asset ID</p>
                        <p className="font-mono">{truncateString(asset.assetId, 6, 4)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Supply</p>
                        <p>{formatNumber(asset.totalSupply)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Creator</p>
                        <p>{creator?.name || truncateString(asset.creator, 4, 4)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Created</p>
                        <p>{new Date(asset.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedAsset} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <DialogContent className="max-w-3xl">
          {selectedAssetDetails && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedAssetDetails.name} ({selectedAssetDetails.symbol})
                </DialogTitle>
                <DialogDescription>Asset ID: {truncateString(selectedAssetDetails.assetId, 10, 10)}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Supply</p>
                  <p className="font-medium">{formatNumber(selectedAssetDetails.totalSupply)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Decimals</p>
                  <p className="font-medium">{selectedAssetDetails.decimals}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Holders</p>
                  <p className="font-medium">{selectedAssetDetails.holders.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDate(selectedAssetDetails.createdAt)}</p>
                </div>
              </div>

              <Tabs defaultValue="holders">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="holders">Holders</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                </TabsList>
                <TabsContent value="holders" className="mt-4">
                  <AssetHolders asset={selectedAssetDetails} />
                </TabsContent>
                <TabsContent value="transactions" className="mt-4">
                  <AssetTransactions asset={selectedAssetDetails} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
