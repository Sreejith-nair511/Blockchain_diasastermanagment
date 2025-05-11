"use client"

import { PageTitle } from "@/components/page-title"
import { ExportImportState } from "@/components/export-import/export-import-state"
import { motion } from "framer-motion"

export default function ExportImportPage() {
  return (
    <main className="container mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <PageTitle title="Export/Import State" description="Save or load your blockchain simulation state" />

        <div className="mt-6">
          <ExportImportState />
        </div>
      </motion.div>
    </main>
  )
}
