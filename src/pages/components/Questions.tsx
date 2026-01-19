import React, { useState } from "react";
import Result from "./Result";
import Advice from "./Advice";

export interface QuestionProps {
  question: string;
  description: string;
  choices: string[];
  values: number[];
}
const Questions = () => {
  const [points, setPoints] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<{
    [key: string]: string | null;
  }>({});

  const [selectedQuestion, setSelectedQuestion] = useState<
    { question: string; choice: string; choiceIndex: number }[]
  >([]);
  const data = [
    {
      question: "Depression Mood",
      description:
        "Gloomy attitude, pessimism about the future, feeling of sadness, tendency to weep",
      choices: [
        "Absent",
        "Sadness",
        "Occasional weeping",
        "Frequent weeping",
        "Extreme symptoms",
      ],
      values: [0, 1, 2, 3, 4],
    },
    {
      question: "Initial insomnia",
      description: "Difficulty falling asleep",
      choices: ["Absent", "Occasional", "Frequent"],
      values: [0, 1, 2],
    },
    {
      question: "Insomnia during the night",
      description: "Restless, disturbed, waking at night",
      choices: ["Absent", "Occasional", "Frequent"],
      values: [0, 1, 2],
    },
    {
      question: "Delayed insomnia",
      description: "Absence from work after treatment or recovery may rate <4",
      choices: [
        "No difficulty",
        "Feelings of incapacity, listlessness, indecision, and vacillation",
        "Loss of interest in hobbies, decreased social activities",
        "Productivity decreased",
        "Unable to work, stopped working because of present illness only (if absent from work after treatment or recovery may rate a lower score)",
      ],
      values: [0, 1, 2, 3, 4],
    },
    {
      question: "Retardation",
      description: "Slowness of thought, speech, and activity; apathy; stupor",
      choices: [
        "Absent",
        "Slight retardation at interview",
        "Obvious retardation at interview",
        "Interview difficult",
        "Complete stupor",
      ],
      values: [0, 1, 2, 3, 4],
    },
    {
      question: "Agitation",
      description: "Restlessness associated with anxiety",
      choices: ["Absent", "Mild", "Severe"],
      values: [0, 1, 2],
    },
    {
      question: "Psychiatric anxiety",
      description: "",
      choices: [
        "Absent",
        "Tension and irritability",
        "Worrying about minor matters",
        "Apprehensive attitude",
        "Fears",
      ],
      values: [0, 1, 2, 3, 4],
    },
    {
      question: "Somatic anxiety",
      description:
        "Gastrointestinal, indigestion, cardiovascular, palpitations, headaches, respiratory, genitourinary, etc.",
      choices: ["Absent", "Mild", "Moderate", "Severe", "Incapacitating"],
      values: [0, 1, 2, 3, 4],
    },
    {
      question: "Gastrointestinal somatic symptoms",
      description: "Loss of appetite, heavy feeling in abdomen, constipation",
      choices: ["Absent", "Mild", "Severe"],
      values: [0, 1, 2],
    },
    {
      question: "General somatic symptoms",
      description:
        "Heaviness in limbs, back, or head; diffuse backache; loss of energy and fatigability",
      choices: ["Absent", "Mild", "Severe"],
      values: [0, 1, 2],
    },
    {
      question: "Genital symptoms",
      description: "Loss of libido, menstrual disturbances",
      choices: ["Absent", "Mild", "Severe"],
      values: [0, 1, 2],
    },
    {
      question: "Hypochondriasis",
      description: "Loss of libido, menstrual disturbances",
      choices: [
        "Not Present",
        "Bodily self-absorption",
        "Preoccupation with health",
        "Querulous attitude",
        "Hypochondriacal delusions",
      ],
      values: [0, 1, 2, 3, 4],
    },
    {
      question: "Weight loss",
      description: "Loss of libido, menstrual disturbances",
      choices: ["Not Present", "Slight", "Obvious or severe"],
      values: [0, 1, 2],
    },
    {
      question: "Insight",
      description:
        "Must be interpreted in terms of patient’s understanding and background",
      choices: ["No Loss", "Partial or doubtful loss", "Loss of insight"],
      values: [0, 1, 2],
    },
  ];
  const answeredCount = Object.keys(selectedItems).length;
  const progress = (answeredCount / data.length) * 100;
  const handleSelectedItem = (
    question: QuestionProps,
    choice: string,
    choiceIndex: number,
  ) => {
    setSelectedItems((prev) => ({
      ...prev,
      [question.question]: choice,
    }));

    setSelectedQuestion((prevSelected) => {
      const foundSelectedQuestion = prevSelected.some(
        (q) => q.question === question.question,
      );

      let newPoints = points;

      if (foundSelectedQuestion) {
        const previousSelection = prevSelected.find(
          (q) => q.question === question.question,
        );

        if (previousSelection) {
          newPoints -= question.values[previousSelection.choiceIndex];
        }

        newPoints += question.values[choiceIndex];
      } else {
        newPoints += question.values[choiceIndex];
      }

      setPoints(newPoints);
      setTotalScore(newPoints);
      return [
        ...prevSelected.filter((q) => q.question !== question.question),
        { question: question.question, choice, choiceIndex },
      ];
    });
  };
  const getQuestionIcon = (index: number) => {
    const icons = [
      "😔",
      "🌙",
      "😴",
      "💤",
      "🐢",
      "😰",
      "🧠",
      "💓",
      "🍽️",
      "💪",
      "❤️",
      "🏥",
      "⚖️",
      "💡",
    ];
    return icons[index] || "📋";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 poppins-regular">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#37a0ac] to-[#2d8a94] text-white">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Hamilton Depression Rating Scale
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Depression Assessment
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Answer each question honestly based on how you&apos;ve been
              feeling over the past week. Your responses help us provide
              personalized insights.
            </p>
          </div>

          {/* Progress Section */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/80">Your Progress</span>
              <span className="text-sm font-semibold">
                {answeredCount} of {data.length} questions
              </span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/60">
              <span>Start</span>
              <span>{Math.round(progress)}% Complete</span>
              <span>Finish</span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
        <div className="space-y-6">
          {data.map((item, index) => (
            <div
              key={item.question}
              className={`bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden transition-all duration-300 ${
                selectedItems[item.question]
                  ? "ring-2 ring-[#37a0ac] ring-opacity-50"
                  : "hover:shadow-xl"
              }`}
            >
              {/* Question Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        selectedItems[item.question]
                          ? "bg-gradient-to-br from-[#37a0ac] to-[#2d8a94]"
                          : "bg-gray-100"
                      }`}
                    >
                      {selectedItems[item.question] ? (
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span>{getQuestionIcon(index)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[#37a0ac] bg-[#37a0ac]/10 px-2 py-1 rounded-full">
                        Question {index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.question}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Choices */}
              <div className="p-4 bg-gray-50/50">
                <div className="grid gap-2">
                  {item.choices.map((choice, choiceIndex) => {
                    const isSelected = selectedItems[item.question] === choice;
                    return (
                      <button
                        key={choiceIndex}
                        onClick={() =>
                          handleSelectedItem(item, choice, choiceIndex)
                        }
                        className={`group relative w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? "border-[#37a0ac] bg-gradient-to-r from-[#37a0ac]/10 to-[#2d8a94]/10"
                            : "border-gray-200 bg-white hover:border-[#37a0ac]/50 hover:bg-[#37a0ac]/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? "border-[#37a0ac] bg-[#37a0ac]"
                                  : "border-gray-300 group-hover:border-[#37a0ac]"
                              }`}
                            >
                              {isSelected && (
                                <svg
                                  className="w-4 h-4 text-white"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                            <span
                              className={`font-medium transition-colors ${
                                isSelected ? "text-[#37a0ac]" : "text-gray-700"
                              }`}
                            >
                              {choice}
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-2 ${
                              isSelected ? "text-[#37a0ac]" : "text-gray-400"
                            }`}
                          >
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-md ${
                                isSelected
                                  ? "bg-[#37a0ac] text-white"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {choiceIndex} pts
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Completion Message */}
        {answeredCount === data.length && (
          <div className="mt-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white text-center animate-fade-in">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold mb-2">Assessment Complete!</h3>
            <p className="text-white/80">
              Great job! Scroll down to see your results and personalized
              advice.
            </p>
          </div>
        )}
      </div>

      {/* Sticky Results */}
      <Result
        score={totalScore}
        answeredCount={answeredCount}
        totalQuestions={data.length}
      />

      {/* Advice Section */}
      {answeredCount === data.length && (
        <Advice score={totalScore} selectedQuestion={selectedQuestion} />
      )}
    </div>
  );
};

export default Questions;
