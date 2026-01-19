import React, { useState } from "react";
import { ScoreProps } from "./Result";
import AdviceModal from "./AdviceModal";
import Swal from "sweetalert2";

const Advice: React.FC<ScoreProps> = ({ score, selectedQuestion }) => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateAdvice = async (prompt: string) => {
    setLoading(true);

    try {
      const response = await fetch("/api/generateAdvice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Make sure you have an internet connection.`);
      }
      const data = await response.json();
      setAdvice(data.result);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: `${error}`,
        confirmButtonColor: "#37a0ac",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-lg",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAdvice = (
    selectedQuestion: {
      question: string;
      choice: string;
      choiceIndex: number;
    }[] = [],
  ) => {
    const questionsText = selectedQuestion
      .map((q) => `${q.question}: ${q.choice}`)
      .join("; ");
    if (questionsText) {
      generateAdvice(
        `Generate advice based on these responses: ${questionsText}`,
      );
    }
  };

  return (
    <div className="poppins-regular pb-32">
      {/* Advice Generation Section */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#37a0ac] to-[#2d8a94] p-6 text-white">
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
                <h3 className="text-xl font-bold">AI-Powered Insights</h3>
                <p className="text-white/80 text-sm">
                  Get personalized recommendations based on your responses
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!advice ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-[#37a0ac]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-[#37a0ac]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready for Your Personalized Advice?
                </h4>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Our AI will analyze your responses and provide tailored
                  recommendations to support your mental wellness journey.
                </p>

                <button
                  onClick={() => handleGenerateAdvice(selectedQuestion)}
                  disabled={loading}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#37a0ac] to-[#2d8a94] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#37a0ac]/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Generating Insights...</span>
                    </>
                  ) : (
                    <>
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
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <span>Generate My Advice</span>
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
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-600">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">
                    Advice Generated Successfully
                  </span>
                </div>

                <button
                  onClick={() => handleGenerateAdvice(selectedQuestion)}
                  className="text-[#37a0ac] hover:text-[#2d8a94] font-medium text-sm inline-flex items-center gap-1 transition-colors"
                >
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Regenerate Advice
                </button>
              </div>
            )}
          </div>

          {/* Loading State Animation */}
          {loading && (
            <div className="px-6 pb-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#37a0ac]/20 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-[#37a0ac] border-t-transparent rounded-full animate-spin" />
                  </div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded-full w-1/2 animate-pulse" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded-full w-4/5 animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Tips Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: "🧘",
              title: "Practice Mindfulness",
              description: "Take 5 minutes daily for deep breathing exercises",
            },
            {
              icon: "🏃",
              title: "Stay Active",
              description: "Regular exercise can significantly improve mood",
            },
            {
              icon: "💬",
              title: "Seek Support",
              description: "Talk to trusted friends, family, or professionals",
            },
          ].map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
              <p className="text-sm text-gray-500">{tip.description}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
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
          <div>
            <p className="text-sm text-amber-800 font-medium">
              Important Disclaimer
            </p>
            <p className="text-sm text-amber-700 mt-1">
              This assessment is for informational purposes only and is not a
              substitute for professional medical advice, diagnosis, or
              treatment. If you&apos;re experiencing severe symptoms, please
              consult a healthcare professional.
            </p>
          </div>
        </div>
      </div>

      <AdviceModal score={score} advice={advice} />
    </div>
  );
};

export default Advice;
