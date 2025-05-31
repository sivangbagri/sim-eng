import Link from "next/link"
import { User, Calendar, MessageCircle, Hash, Clock, TrendingUp, Heart } from "lucide-react"

// Persona data based on the provided schema
const personaData = {
  basic_info: {
    username: "WhySid",
    screen_name: "Sidhanth_here",
    bio: "",
    location: "",
    website: "",
    followers_count: 0,
    following_count: 0,
    account_creation: "2022-08-31T13:49:36.815Z",
    activity_period: "Sep 2022 to May 2025",
    tweet_count: 15716,
  },
  interests: ["Finance", "Crypto/Blockchain", "Gaming", "Technology", "Sports"],
  personality_traits: ["Creative", "Independent", "Optimistic", "Curious", "Collaborative"],
  communication_style: {
    tone: "Neutral",
    formality: "Semi-formal",
    engagement: ["Conversational"],
    emoji_usage: "Occasional",
  },
  frequent_topics: ["https", "hai", "mai", "nahi", "toh", "time", "one", "people", "bhai", "like"],
  top_hashtags: [
    "100DaysOfHustle",
    "100DaysOfCode",
    "100DaysofHustle",
    "100daysofcodechallenge",
    "100daysofcodepython",
    "buildinpublic",
    "startups",
    "NewProfilePic",
    "buildinginpublic",
    "Entrepreneurship",
  ],
  activity_patterns: {
    most_active_hours: [19, 8, 11],
    most_active_days: ["Monday", "Thursday", "Friday"],
    posting_frequency: "Very active (multiple posts daily)",
  },
  social_interactions: {
    most_mentioned_users: ["avgphoenixguy", "_rishabh__r4", "shivuuuuu264", "pennedbyher", "aShubhamz"],
    reply_percentage: 71.9,
    retweet_percentage: 2.9,
    interaction_style: "Highly interactive",
  },
  likes_analysis: {
    top_liked_hashtags: [],
    liked_topics: [
      "https",
      "hai",
      "people",
      "like",
      "one",
      "bhai",
      "time",
      "good",
      "get",
      "life",
      "day",
      "bhi",
      "college",
      "got",
      "best",
      "know",
      "first",
      "even",
      "work",
      "year",
    ],
  },
}

export default function PersonaPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatHour = (hour: number) => {
    return hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Persona Profile</h1>
            <p className="text-gray-400">Twitter/X user analysis and insights</p>
          </div>
          <Link href="/">
            <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
              Back to Home
            </button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Basic Info Header */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                {personaData.basic_info.username.slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">{personaData.basic_info.username}</h2>
                <p className="text-gray-400">@{personaData.basic_info.screen_name}</p>

                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 text-sm text-gray-400">
                  <div className="flex items-center justify-center md:justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {formatDate(personaData.basic_info.account_creation)}
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Clock className="w-4 h-4 mr-2" />
                    Active: {personaData.basic_info.activity_period}
                  </div>
                </div>
              </div>

              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {personaData.basic_info.tweet_count.toLocaleString()}
              </div>
              <p className="text-gray-400 text-sm">Tweets</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-green-400">{personaData.basic_info.followers_count}</div>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-purple-400">{personaData.basic_info.following_count}</div>
              <p className="text-gray-400 text-sm">Following</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
              <div className="text-2xl font-bold text-orange-400">
                {personaData.social_interactions.reply_percentage}%
              </div>
              <p className="text-gray-400 text-sm">Reply Rate</p>
            </div>
          </div>

          {/* Interests & Personality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {personaData.interests.map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personality Traits
              </h3>
              <div className="flex flex-wrap gap-2">
                {personaData.personality_traits.map((trait, index) => (
                  <span key={index} className="px-3 py-1 border border-gray-600 rounded-full text-sm">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Communication Style */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Communication Style
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-400">Tone</p>
                <p className="font-medium">{personaData.communication_style.tone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Formality</p>
                <p className="font-medium">{personaData.communication_style.formality}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Engagement</p>
                <p className="font-medium">{personaData.communication_style.engagement.join(", ")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Emoji Usage</p>
                <p className="font-medium">{personaData.communication_style.emoji_usage}</p>
              </div>
            </div>
          </div>

          {/* Activity Patterns */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Activity Patterns
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Most Active Hours</p>
                <div className="flex flex-wrap gap-1">
                  {personaData.activity_patterns.most_active_hours.map((hour, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {formatHour(hour)}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Most Active Days</p>
                <div className="flex flex-wrap gap-1">
                  {personaData.activity_patterns.most_active_days.map((day, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Posting Frequency</p>
                <p className="font-medium text-sm">{personaData.activity_patterns.posting_frequency}</p>
              </div>
            </div>
          </div>

          {/* Top Hashtags */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Hash className="w-5 h-5 mr-2" />
              Top Hashtags
            </h3>
            <div className="flex flex-wrap gap-2">
              {personaData.top_hashtags.slice(0, 10).map((hashtag, index) => (
                <span key={index} className="px-2 py-1 border border-gray-600 rounded text-xs">
                  #{hashtag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Interactions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Most Mentioned Users</h3>
              <div className="space-y-2">
                {personaData.social_interactions.most_mentioned_users.map((user, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs">
                      {user.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm">@{user}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Interaction Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Reply Rate</span>
                    <span>{personaData.social_interactions.reply_percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full"
                      style={{ width: `${personaData.social_interactions.reply_percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Retweet Rate</span>
                    <span>{personaData.social_interactions.retweet_percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-400 h-2 rounded-full"
                      style={{ width: `${personaData.social_interactions.retweet_percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Interaction Style</p>
                  <p className="font-medium">{personaData.social_interactions.interaction_style}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Frequent Topics & Liked Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Frequent Topics</h3>
              <div className="flex flex-wrap gap-1">
                {personaData.frequent_topics.slice(0, 15).map((topic, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-700 rounded text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Liked Topics</h3>
              <div className="flex flex-wrap gap-1">
                {personaData.likes_analysis.liked_topics.slice(0, 15).map((topic, index) => (
                  <span key={index} className="px-2 py-1 border border-gray-600 rounded text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
