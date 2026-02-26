"use client"

import * as React from "react"
import { UploadCloud, FileText, X, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function FileUpload({
  onFileSelect,
  existingFileUrl = null,
}) {
  const [file, setFile] = React.useState(null)
  const [dragActive, setDragActive] = React.useState(false)
  const [existingFile, setExistingFile] = React.useState(existingFileUrl)

  // 🔥 Sync when editing page loads
  React.useEffect(() => {
    setExistingFile(existingFileUrl)
  }, [existingFileUrl])

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return

    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed")
      return
    }

    setFile(selectedFile)
    setExistingFile(null) // remove old preview visually
    onFileSelect?.(selectedFile)
  }

  const removeFile = () => {
    setFile(null)
    setExistingFile(null)
    onFileSelect?.(null)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const fileNameFromUrl = (url) => {
    if (!url) return ""
    return url.split("/").pop()
  }

  return (
    <Card
      className={`p-6 border-2 border-dashed transition-all ${
        dragActive
          ? "border-primary bg-primary/5"
          : "hover:border-primary border-border"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center space-y-4">

        {/* 🔥 SHOW NEW FILE */}
        {file && (
          <div className="w-full flex items-center justify-between bg-muted p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium truncate max-w-[200px]">
                {file.name}
              </p>
            </div>
            <X
              className="h-4 w-4 cursor-pointer hover:text-red-500"
              onClick={removeFile}
            />
          </div>
        )}

        {/* 🔥 SHOW EXISTING FILE */}
        {!file && existingFile && (
          <div className="w-full flex items-center justify-between bg-muted p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium truncate max-w-[200px]">
                {fileNameFromUrl(existingFile)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={existingFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 hover:text-primary" />
              </a>

              <X
                className="h-4 w-4 cursor-pointer hover:text-red-500"
                onClick={removeFile}
              />
            </div>
          </div>
        )}

        {/* 🔥 SHOW UPLOAD UI IF NOTHING */}
        {!file && !existingFile && (
          <>
            <UploadCloud className="h-10 w-10 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {dragActive ? "Drop PDF here" : "Upload NOC / Offer Letter"}
              </p>
              <p className="text-sm text-muted-foreground">PDF only</p>
            </div>

            <label className="w-full">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(e.target.files?.[0])
                }
              />
              <Button variant="secondary" asChild className="w-full">
                <span className="cursor-pointer">
                  Select File
                </span>
              </Button>
            </label>
          </>
        )}
      </div>
    </Card>
  )
}
