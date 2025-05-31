import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface BasicInfo {
    username: string;
    screen_name: string;
    followers_count: number;
    following_count: number;
}

export interface PersonaData {
    basic_info: BasicInfo;
    interests: string[];
    personality_traits: string[];
    frequent_topics: string[];
    top_hashtags: string[];
    likes_analysis: {
        liked_topics: string[];
    };
}

export interface QuestionOption {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    text: string;
    options: QuestionOption[];
}

export interface SurveyData {
    title: string;
    description: string;
    questions: Question[];
}

export interface SimulationResponse {
    question_id: string;
    question: string;
    selected_option: string;
}

export interface SimulationResult {
    responses: SimulationResponse[];
}

export const simulationService = {
    simulate: async (persona: PersonaData, questions: Question[]): Promise<SimulationResult> => {
        try {
            const response = await api.post('/simulate', {
                persona,
                questions
            });
            return response.data;
        } catch (error) {
            console.error('Error in simulation:', error);
            throw error;
        }
    },

    simulateMultiple: async (personas: PersonaData[], surveyData: SurveyData): Promise<SimulationResponse[]> => {
        try {
            const response = await api.post('/simulate/multiple', {
                personas,
                survey: surveyData
            });
            return response.data.responses;
        } catch (error) {
            console.error('Error in multiple simulation:', error);
            throw error;
        }
    }
};

export default api; 