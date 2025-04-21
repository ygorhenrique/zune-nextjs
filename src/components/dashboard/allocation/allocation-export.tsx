"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export function AllocationExport() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)

    // Simulate PDF generation
    setTimeout(() => {
      setIsExporting(false)
      // In a real app, you would generate and download a PDF here
      alert("PDF export functionality would be implemented here")
    }, 1500)
  }

  return (
    <div className="mt-6 flex justify-end">
      <Button onClick={handleExport} disabled={isExporting} className="flex items-center gap-2">
        <FileDown className="h-4 w-4" />
        {isExporting ? "Generating PDF..." : "Export as PDF"}
      </Button>
    </div>
  )
}
