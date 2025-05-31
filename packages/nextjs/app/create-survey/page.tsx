"use client"

import { useState } from "react"
import { Plus, Trash2, Download, Play } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Option {
  id: string
  text: string
}

interface Question {
  id: string
  text: string
  options: Option[]
}

interface Survey {
  title: string
  description: string
  questions: Question[]
}

export default function CreateSurveyPage() {
  const [survey, setSurvey] = useState<Survey>({
    title: "",
    description: "",
    questions: [],
  })

  const router = useRouter()

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: "",
      options: [
        { id: Date.now().toString() + "-1", text: "" },
        { id: Date.now().toString() + "-2", text: "" },
      ],
    }
    setSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
  }

  const updateQuestion = (questionId: string, text: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === questionId ? { ...q, text } : q)),
    }))
  }

  const addOption = (questionId: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, { id: Date.now().toString(), text: "" }] } : q,
      ),
    }))
  }

  const updateOption = (questionId: string, optionId: string, text: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, options: q.options.map((o) => (o.id === optionId ? { ...o, text } : o)) } : q,
      ),
    }))
  }

  const removeOption = (questionId: string, optionId: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, options: q.options.filter((o) => o.id !== optionId) } : q,
      ),
    }))
  }

  const removeQuestion = (questionId: string) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }))
  }

  const downloadSurvey = () => {
    const dataStr = JSON.stringify(survey, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `survey-${Date.now()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const simulateSurvey = async () => {
    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(survey),
      });
      
      if (response.ok) {
        router.push('/results');
      }
    } catch (error) {
      console.error('Failed to simulate survey:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Create Survey</h1>
            <p className="text-gray-400">Build your custom survey form</p>
          </div>
          <Link href="/">
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Survey Info */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Survey Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Survey Title</label>
                <input
                  type="text"
                  value={survey.title}
                  onChange={(e) => setSurvey((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter survey title"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description/Context</label>
                <textarea
                  value={survey.description}
                  onChange={(e) => setSurvey((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your product or idea..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Questions */}
          {survey.questions.map((question, questionIndex) => (
            <div key={question.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
                <button
                  onClick={() => removeQuestion(question.id)}
                  className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Question Text</label>
                  <input
                    type="text"
                    value={question.text}
                    onChange={(e) => updateQuestion(question.id, e.target.value)}
                    placeholder="Enter your question"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Options</label>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div key={option.id} className="flex gap-2">
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {question.options.length > 2 && (
                          <button
                            onClick={() => removeOption(question.id, option.id)}
                            className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => addOption(question.id)}
                      className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Option
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </button>

            {survey.questions.length > 0 && survey.title && (
              <>
                <button
                  onClick={downloadSurvey}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download JSON
                </button>
                <button
                  onClick={simulateSurvey}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Simulate
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
