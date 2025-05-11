"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Upload, Copy, Check } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useBlockchain } from "@/context/blockchain-context"
import { useToast } from "@/components/ui/use-toast"

export function ExportImportState() {
  const { exportState, importState } = useBlockchain()
  const { toast } = useToast()

  const [exportedState, setExportedState] = useState("")
  const [importData, setImportData] = useState("")
  const [copied, setCopied] = useState(false)

  const handleExport = () => {
    const state = exportState()
    setExportedState(state)

    toast({
      title: "State Exported",
      description: "Your blockchain state has been exported successfully.",
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(exportedState)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)

    toast({
      title: "Copied to Clipboard",
      description: "The exported state has been copied to your clipboard.",
    })
  }

  const handleImport = () => {
    if (!importData.trim()) {
      toast({
        title: "Import Failed",
        description: "Please paste a valid state JSON.",
        variant: "destructive",
      })
      return
    }

    try {
      importState(importData)
      setImportData("")
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Invalid state data. Please check the format.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Export Blockchain State</h3>
            <p className="text-sm text-muted-foreground">
              Export your current blockchain state as JSON. You can save this data and import it later.
            </p>

            <div className="flex gap-2">
              <Button onClick={handleExport} className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Export State
              </Button>

              {exportedState && (
                <Button variant="outline" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>

            {exportedState && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <Textarea value={exportedState} readOnly className="h-40 font-mono text-xs" />
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Import Blockchain State</h3>
            <p className="text-sm text-muted-foreground">
              Import a previously exported blockchain state. This will replace your current state.
            </p>

            <Textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste exported JSON here..."
              className="h-40 font-mono text-xs"
            />

            <Button onClick={handleImport} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Import State
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
