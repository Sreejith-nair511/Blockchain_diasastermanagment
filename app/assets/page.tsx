"use client"

import { useState } from "react"
import { AssetCreationForm } from "@/components/assets/asset-creation-form"
import { AssetExplorer } from "@/components/assets/asset-explorer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTitle } from "@/components/page-title"
import { motion } from "framer-motion"

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState("explorer")

  return (
    <main className="container mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <PageTitle title="Asset Management" description="Create and explore Algorand Standard Assets (ASAs)" />

        <Tabs defaultValue="explorer" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explorer">Asset Explorer</TabsTrigger>
            <TabsTrigger value="create">Create Asset</TabsTrigger>
          </TabsList>
          <TabsContent value="explorer" className="mt-6">
            <AssetExplorer />
          </TabsContent>
          <TabsContent value="create" className="mt-6">
            <AssetCreationForm />
          </TabsContent>
        </Tabs>
      </motion.div>
    </main>
  )
}
