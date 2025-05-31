"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Upload, FileText, AlertCircle } from "lucide-react"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.name.endsWith(".zip")) {
        setUploadedFile(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.name.endsWith(".zip")) {
        setUploadedFile(file)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Upload Twitter Archive</h1>
            <p className="text-gray-400">Upload your Twitter archive data for analysis</p>
          </div>
          <Link href="/">
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Upload Area */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Upload your Twitter archive zip</h2>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-900/20" : "border-gray-600 hover:border-gray-500"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <FileText className="w-16 h-16 mx-auto text-green-400" />
                  <div>
                    <p className="font-medium text-green-400">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-400">{(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 mx-auto text-gray-400" />
                  <div>
                    <p className="text-lg font-medium">Drop your Twitter archive here</p>
                    <p className="text-gray-400">or click to browse</p>
                  </div>
                  <input type="file" accept=".zip" onChange={handleFileInput} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload">
                    <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                      Choose File
                    </button>
                  </label>
                </div>
              )}
            </div>

            {uploadedFile && (
              <div className="mt-6">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  Process Archive
                </button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Instructions to obtain Twitter archive</h2>

            <div className="flex items-start gap-3 p-4 bg-blue-900/20 border border-blue-700 rounded-lg mb-4">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-blue-200 text-sm">Follow these steps to download your Twitter archive data</p>
            </div>

            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
              <li>Go to Twitter Settings and Privacy</li>
              <li>Click on "Your Account" then "Download an archive of your data"</li>
              <li>Enter your password to confirm</li>
              <li>Wait for Twitter to prepare your archive (this can take up to 24 hours)</li>
              <li>Download the ZIP file when ready</li>
              <li>Upload the ZIP file here for analysis</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
