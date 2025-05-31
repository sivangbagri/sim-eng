'use client'

import React, { useState, useEffect } from 'react';

interface SurveyOption {
  text: string;
  percentage: number;
  count: number;
}

interface SurveyQuestion {
  question_id: string;
  question_text: string;
  total_responses: number;
  options: SurveyOption[];
}

interface Participant {
  id: string;
  name: string;
  status: string;
}

interface SurveyData {
  title: string;
  description: string;
  total_personas: number;
  total_responses: number;
  questions: SurveyQuestion[];
  participants: Participant[];
}

export default function SimpleSurveyResults() {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveyResults = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/simulate');
        const result = await response.json();
        
        if (result.success) {
          setSurveyData(result.data);
        } else {
          setError(result.error || 'Failed to load survey results');
        }
      } catch (err) {
        const error = err as Error;
        setError('Network error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyResults();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading survey results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!surveyData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Survey Results</h1>
            <p className="text-gray-400">Persona-based survey simulation results</p>
          </div>
          <a href="/" className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
            Back to Home
          </a>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-2">{surveyData.title}</h2>
            <p className="text-gray-400 mb-4">{surveyData.description}</p>
            <div className="flex gap-4">
              <span className="inline-block px-3 py-1 bg-gray-700 rounded-full text-sm">
                {surveyData.total_personas} personas
              </span>
              <span className="inline-block px-3 py-1 bg-blue-700 rounded-full text-sm">
                {surveyData.total_responses} total responses
              </span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-6">Results</h2>
            <div className="space-y-8">
              {surveyData.questions.map((question, index) => (
                <div key={question.question_id} className="border-b border-gray-700 pb-6 last:border-b-0">
                  <h3 className="font-semibold text-lg mb-4">
                    Question {index + 1}: {question.question_text}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Total responses: {question.total_responses}
                  </p>
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex-1 mr-4">{option.text}</span>
                          <span className="text-gray-400 whitespace-nowrap">
                            {option.percentage}% ({option.count} responses)
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${option.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-6">
              Participants ({surveyData.participants.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {surveyData.participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {participant.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{participant.name}</p>
                    <span className="inline-block px-2 py-1 rounded text-xs bg-green-900/30 text-green-400">
                      {participant.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
              Create your survey and earn
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{surveyData.total_personas}</div>
                <div className="text-gray-400">Personas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{surveyData.total_responses}</div>
                <div className="text-gray-400">Total Responses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{surveyData.questions.length}</div>
                <div className="text-gray-400">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">100%</div>
                <div className="text-gray-400">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}