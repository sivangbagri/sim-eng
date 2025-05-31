import Link from "next/link"
import { FileText, Upload, User, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Survey Builder</h1>
          <p className="text-xl text-gray-300">Create, manage, and analyze your surveys</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link href="/create-survey">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700">
              <div className="text-center">
                <FileText className="w-12 h-12 mx-auto text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Create Survey</h3>
                <p className="text-gray-400 text-sm">Build new surveys with custom questions</p>
              </div>
            </div>
          </Link>

          <Link href="/results">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto text-green-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Survey Results</h3>
                <p className="text-gray-400 text-sm">View responses and analytics</p>
              </div>
            </div>
          </Link>

          <Link href="/upload">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Archive</h3>
                <p className="text-gray-400 text-sm">Upload Twitter archive data</p>
              </div>
            </div>
          </Link>

          <Link href="/persona">
            <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700">
              <div className="text-center">
                <User className="w-12 h-12 mx-auto text-orange-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Persona</h3>
                <p className="text-gray-400 text-sm">Manage user personas</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
  