import React, { useState } from "react";
import { ScoreProps } from "./Result";
import { marked } from "marked";

const AdviceModal: React.FC<ScoreProps> = ({ score = 0, advice }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreData = () => {
    if (score <= 7) {
      return {
        level: "Normal",
        description: "No Depression",
        color: "emerald",
        bgGradient: "from-emerald-500 to-emerald-600",
        lightBg: "bg-emerald-50",
        border: "border-emerald-200",
        text: "text-emerald-700",
        icon: "😊",
        message: "Great news! Your mental health appears to be in good shape.",
      };
    } else if (score <= 13) {
      return {
        level: "Mild",
        description: "Depression",
        color: "yellow",
        bgGradient: "from-yellow-500 to-yellow-600",
        lightBg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-700",
        icon: "😐",
        message: "You may be experiencing mild symptoms. Self-care practices can help.",
      };
    } else if (score <= 18) {
      return {
        level: "Moderate",
        description: "Depression",
        color: "orange",
        bgGradient: "from-orange-500 to-orange-600",
        lightBg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-700",
        icon: "😔",
        message: "Consider reaching out to a mental health professional for support.",
      };
    } else if (score <= 22) {
      return {
        level: "Severe",
        description: "Depression",
        color: "red",
        bgGradient: "from-red-500 to-red-600",
        lightBg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-700",
        icon: "😢",
        message: "Please consider seeking professional help. You don't have to face this alone.",
      };
    } else {
      return {
        level: "Very Severe",
        description: "Depression",
        color: "red",
        bgGradient: "from-red-600 to-red-700",
        lightBg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-800",
        icon: "🆘",
        message: "Please reach out to a mental health professional or crisis line immediately.",
      };
    }
  };

  const scoreData = getScoreData();

  if (!advice) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 poppins-regular">
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#37a0ac] to-[#2d8a94] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Your Personalized Advice
                </h2>
                <p className="text-white/80 text-sm">
                  AI-generated recommendations based on your responses
                </p>
              </div>
            </div>

            {/* Score Badge */}
            <div className="hidden sm:flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
              <span className="text-2xl">{scoreData.icon}</span>
              <div className="text-white">
                <p className="text-sm font-semibold">{score} Points</p>
                <p className="text-xs text-white/80">{scoreData.level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Score Summary Card */}
        <div className="p-6 border-b border-gray-100">
          <div className={`${scoreData.lightBg} ${scoreData.border} border rounded-xl p-4`}>
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${scoreData.bgGradient} flex items-center justify-center shadow-lg`}>
                <span className="text-3xl">{scoreData.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-lg font-bold ${scoreData.text}`}>
                    {scoreData.level} {scoreData.description}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${scoreData.lightBg} ${scoreData.text} ${scoreData.border} border`}>
                    Score: {score}
                  </span>
                </div>
                <p className={`text-sm ${scoreData.text} opacity-80`}>
                  {scoreData.message}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advice Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#37a0ac]/10 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#37a0ac]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900">
              Recommendations for You
            </h3>
          </div>

          {/* Scrollable Content */}
          <div
            className={`relative overflow-hidden transition-all duration-500 ${
              isExpanded ? "max-h-none" : "max-h-[300px]"
            }`}
          >
            <div
              className="prose prose-sm sm:prose max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900 prose-a:text-[#37a0ac] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: marked(advice) }}
            />

            {/* Gradient Overlay when collapsed */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-2 text-[#37a0ac] hover:text-[#2d8a94] font-medium text-sm transition-colors"
          >
            {isExpanded ? (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                Show Less
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                Read Full Advice
              </>
            )}
          </button>
        </div>

        {/* Helpful Resources */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#37a0ac]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              Helpful Resources
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  icon: "📞",
                  title: "Crisis Hotline",
                  desc: "24/7 Support",
                  color: "bg-red-50 hover:bg-red-100",
                },
                {
                  icon: "🏥",
                  title: "Find Therapist",
                  desc: "Professional Help",
                  color: "bg-blue-50 hover:bg-blue-100",
                },
                {
                  icon: "📚",
                  title: "Self-Help",
                  desc: "Guides & Tips",
                  color: "bg-purple-50 hover:bg-purple-100",
                },
                {
                  icon: "🤝",
                  title: "Support Groups",
                  desc: "Community",
                  color: "bg-green-50 hover:bg-green-100",
                },
              ].map((resource, index) => (
                <button
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl ${resource.color} transition-all duration-300 text-left group`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {resource.icon}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {resource.title}
                    </p>
                    <p className="text-xs text-gray-500">{resource.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 hover:border-[#37a0ac] text-gray-700 hover:text-[#37a0ac] font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Results
            </button>
            <button
              onClick={() => {
                navigator?.clipboard?.writeText(advice);
                // You could add a toast notification here
              }}
              className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 hover:border-[#37a0ac] text-gray-700 hover:text-[#37a0ac] font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Advice
            </button>
            <button className="flex-1 py-3 px-4 bg-gradient-to-r from-[#37a0ac] to-[#2d8a94] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#37a0ac]/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share Results
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-6 pb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  Important Disclaimer
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  This AI-generated advice is for informational purposes only and
                  should not replace professional medical advice, diagnosis, or
                  treatment. If you&apos;re experiencing severe symptoms or thoughts of
                  self-harm, please contact a healthcare professional or emergency
                  services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with timestamp */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Generated on {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceModal;