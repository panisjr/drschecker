import React from "react";

export interface ScoreProps {
  score: number;
  answeredCount?: number;
  totalQuestions?: number;
  selectedQuestion?: {
    question: string;
    choice: string;
    choiceIndex: number;
  }[];
  advice?: string;
}

const Result: React.FC<ScoreProps> = ({ score, answeredCount = 0, totalQuestions = 14 }) => {
  const getResultData = () => {
    if (score <= 7) {
      return {
        level: "Normal",
        description: "No Depression",
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-500",
        icon: "😊",
        message: "Your mental health appears to be in good shape!",
      };
    } else if (score <= 13) {
      return {
        level: "Mild",
        description: "Depression",
        color: "from-yellow-500 to-yellow-600",
        bgColor: "bg-yellow-500",
        icon: "😐",
        message: "Consider practicing self-care and mindfulness.",
      };
    } else if (score <= 18) {
      return {
        level: "Moderate",
        description: "Depression",
        color: "from-orange-500 to-orange-600",
        bgColor: "bg-orange-500",
        icon: "😔",
        message: "Professional support may be beneficial.",
      };
    } else if (score <= 22) {
      return {
        level: "Severe",
        description: "Depression",
        color: "from-red-500 to-red-600",
        bgColor: "bg-red-500",
        icon: "😢",
        message: "Please consider seeking professional help.",
      };
    } else {
      return {
        level: "Very Severe",
        description: "Depression",
        color: "from-red-600 to-red-700",
        bgColor: "bg-red-600",
        icon: "🆘",
        message: "Please reach out to a mental health professional immediately.",
      };
    }
  };

  const resultData = getResultData();
  const maxScore = 52; // Maximum possible score
  const scorePercentage = Math.min((score / maxScore) * 100, 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 poppins-regular">
      {/* Gradient shadow overlay */}
      <div className="absolute bottom-full left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      
      <div className={`bg-gradient-to-r ${resultData.color} shadow-2xl`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
            {/* Score Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-white">{score}</p>
                    <p className="text-[10px] text-white/80 uppercase tracking-wider">Points</p>
                  </div>
                </div>
                {/* Progress ring */}
                <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeDasharray={`${scorePercentage * 3.14} 314`}
                    className="transition-all duration-500"
                  />
                </svg>
              </div>
              
              <div className="border-l border-white/30 pl-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{resultData.icon}</span>
                  <div>
                    <p className="text-xl md:text-2xl font-bold text-white">
                      {resultData.level}
                    </p>
                    <p className="text-sm text-white/80">{resultData.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="hidden lg:block flex-1 px-6 border-l border-white/30">
              <p className="text-white/90 text-sm">{resultData.message}</p>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
              <div className="flex items-center gap-1">
                {[...Array(totalQuestions)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-4 rounded-full transition-all duration-300 ${
                      i < answeredCount ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <div className="text-white text-sm font-medium">
                {answeredCount}/{totalQuestions}
              </div>
            </div>
          </div>

          {/* Mobile message */}
          <div className="lg:hidden mt-3 pt-3 border-t border-white/20">
            <p className="text-white/90 text-sm text-center">{resultData.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;