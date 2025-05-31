interface SimulatedResponse {
  question_id: string;
  selected_option: string;
}

interface OptionCounts {
  [key: string]: number;
}

const samplePersonas = [
    {
      "basic_info": {
        "username": "WhySid",
        "screen_name": "Sidhanth_here",
        "followers_count": 0,
        "following_count": 0,
        "tweet_count": 15716
      },
      "interests": ["Finance", "Crypto/Blockchain", "Gaming", "Technology", "Sports"],
      "personality_traits": ["Creative", "Independent", "Optimistic", "Curious", "Collaborative"],
      "frequent_topics": ["https", "hai", "mai", "nahi", "toh", "time", "one", "people", "bhai", "like"],
      "top_hashtags": ["100DaysOfHustle", "100DaysOfCode", "buildinpublic", "startups", "Entrepreneurship"],
      "likes_analysis": {
        "liked_topics": ["https", "gaming", "tech"]
      }
    },
    {
      "basic_info": {
        "username": "TechGamer01",
        "screen_name": "TechGamer01",
        "followers_count": 1500,
        "following_count": 800
      },
      "interests": ["Gaming", "Technology", "Finance"],
      "personality_traits": ["Creative", "Independent", "Curious"],
      "frequent_topics": ["gaming", "tech", "console", "price", "value"],
      "top_hashtags": ["gaming", "tech", "ps5"],
      "likes_analysis": {
        "liked_topics": ["gaming", "technology", "value"]
      }
    },
    {
      "basic_info": {
        "username": "CasualPlayer",
        "screen_name": "CasualPlayer",
        "followers_count": 500,
        "following_count": 300
      },
      "interests": ["Gaming", "Entertainment", "Budget"],
      "personality_traits": ["Practical", "Budget-conscious", "Social"],
      "frequent_topics": ["weekend", "friends", "affordable", "rent", "occasional"],
      "top_hashtags": ["weekendgaming", "budget", "casual"],
      "likes_analysis": {
        "liked_topics": ["casual gaming", "budget", "weekend"]
      }
    },
    {
      "basic_info": {
        "username": "CollectorKid",
        "screen_name": "CollectorKid", 
        "followers_count": 2000,
        "following_count": 1200
      },
      "interests": ["Gaming", "Collecting", "Technology"],
      "personality_traits": ["Collector", "Quality-focused", "Traditional"],
      "frequent_topics": ["own", "collection", "permanent", "quality", "investment"],
      "top_hashtags": ["collector", "gaming", "ownership"],
      "likes_analysis": {
        "liked_topics": ["collecting", "ownership", "quality"]
      }
    },
    {
      "basic_info": {
        "username": "PragmaticGamer",
        "screen_name": "PragmaticGamer",
        "followers_count": 800,
        "following_count": 600
      },
      "interests": ["Gaming", "Finance", "Reviews"],
      "personality_traits": ["Analytical", "Practical", "Cautious"],
      "frequent_topics": ["depends", "price", "reliability", "reviews", "research"],
      "top_hashtags": ["gaming", "reviews", "practical"],
      "likes_analysis": {
        "liked_topics": ["reviews", "research", "value"]
      }
    }
  ];

let currentSurvey: any = null;

export async function POST(request: Request) {
  try {
    const surveyData = await request.json();
    currentSurvey = surveyData;
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: 'Failed to process survey',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!currentSurvey) {
      throw new Error('No survey data found');
    }
    
    const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';
    const allResponses: SimulatedResponse[] = [];
    
    for (const persona of samplePersonas) {
      try {
        const response = await fetch(`${FASTAPI_URL}/simulate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            persona: persona,
            questions: currentSurvey.questions.map((q: any) => ({
              id: q.id,
              text: q.text,
              options: q.options.map((o: any) => o.text)
            }))
          })
        });

        if (!response.ok) {
          throw new Error(`FastAPI request failed: ${response.status}`);
        }

        const data = await response.json();
        allResponses.push(...data.responses);
      } catch (error) {
        console.error(`Error simulating persona ${persona.basic_info.username}:`, error);
      }
    }

    // Calculate percentages for each question
    const processedResults = currentSurvey.questions.map((question: any) => {
      const questionResponses = allResponses.filter(r => r.question_id === question.id);
      const totalResponses = questionResponses.length;

      const optionCounts: OptionCounts = {};
      question.options.forEach((option: any) => {
        optionCounts[option.text] = 0;
      });

      questionResponses.forEach(response => {
        if (optionCounts.hasOwnProperty(response.selected_option)) {
          optionCounts[response.selected_option]++;
        }
      });

      const optionsWithPercentages = question.options.map((option: any) => {
        const count = optionCounts[option.text];
        const percentage = totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0;
        
        return {
          text: option.text,
          count: count,
          percentage: percentage
        };
      });

      return {
        question_id: question.id,
        question_text: question.text,
        total_responses: totalResponses,
        options: optionsWithPercentages
      };
    });

    return Response.json({
      success: true,
      data: {
        title: currentSurvey.title,
        description: currentSurvey.description,
        total_personas: samplePersonas.length,
        total_responses: allResponses.length,
        questions: processedResults,
        participants: samplePersonas.map((persona, index) => ({
          id: index + 1,
          name: persona.basic_info.username,
          status: "completed"
        }))
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to process survey results',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}



//   {
//     "success": true,
//     "data": {
//       "title": "PS5 Renting Marketplace Survey",
//       "total_personas": 5,
//       "total_responses": 10,
//       "questions": [
//         {
//           "question_id": "1748686165368",
//           "question_text": "Would you consider renting a PS5...",
//           "options": [
//             {
//               "text": "Yes, I'd love to rent occasionally...",
//               "count": 2,
//               "percentage": 40
//             }
//           ]
//         }
//       ]
//     }
//   }