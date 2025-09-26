import React, { useState } from "react";
import {
  QuestionMarkCircleIcon,
  XMarkIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

interface Question {
  id: string;
  category: "self" | "family" | "close" | "friends" | "work" | "preferences";
  text: string;
  type: "chips" | "text" | "scale" | "date";
  options?: string[];
  personId?: string;
  personName?: string;
}

const mockQuestions: Question[] = [
  {
    id: "q1",
    category: "family",
    text: "How often should you check in with your parents?",
    type: "chips",
    options: ["Daily", "Few times a week", "Weekly", "Fortnightly", "Monthly"],
  },
  {
    id: "q2",
    category: "close",
    text: "What's the best way to show support when Ananya is stressed?",
    type: "chips",
    options: [
      "Listen without advice",
      "Offer practical help",
      "Give space",
      "Plan distraction",
      "Send encouraging texts",
    ],
    personId: "1",
    personName: "Ananya",
  },
  {
    id: "q3",
    category: "work",
    text: "How do you prefer to celebrate achievements at work?",
    type: "chips",
    options: [
      "Team lunch",
      "Public recognition",
      "Personal note",
      "Small gift",
      "Just acknowledgment",
    ],
  },
  {
    id: "q4",
    category: "self",
    text: "What time of day do you feel most energetic for important conversations?",
    type: "chips",
    options: [
      "Early morning",
      "Mid-morning",
      "Afternoon",
      "Evening",
      "It varies",
    ],
  },
  {
    id: "q5",
    category: "friends",
    text: "When was the last time you had a meaningful conversation with Priya?",
    type: "chips",
    options: [
      "This week",
      "Last week",
      "This month",
      "Few months ago",
      "Can't remember",
    ],
    personId: "3",
    personName: "Priya",
  },
  {
    id: "q6",
    category: "family",
    text: "What's your mom's preferred way to receive care when she's unwell?",
    type: "chips",
    options: [
      "Home-cooked meals",
      "Company & conversation",
      "Help with tasks",
      "Space to rest",
      "Medical assistance",
    ],
    personId: "2",
    personName: "Mom",
  },
  {
    id: "q7",
    category: "work",
    text: "How do you typically handle conflicts with colleagues?",
    type: "chips",
    options: [
      "Direct conversation",
      "Mediation through manager",
      "Give it time",
      "Address via email",
      "Seek HR guidance",
    ],
  },
];

interface DailyQuestionsProps {
  onComplete?: (answers: Record<string, string>) => void;
}

const DailyQuestions: React.FC<DailyQuestionsProps> = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(true);
  const [textInput, setTextInput] = useState("");

  const currentQuestion = mockQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100;

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "family":
        return {
          bg: "bg-purple-50",
          border: "border-purple-200",
          icon: "text-purple-600",
          dot: "bg-purple-400",
          iconBg: "bg-purple-100",
        };
      case "close":
        return {
          bg: "bg-pink-50",
          border: "border-pink-200",
          icon: "text-pink-600",
          dot: "bg-pink-400",
          iconBg: "bg-pink-100",
        };
      case "friends":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "text-blue-600",
          dot: "bg-blue-400",
          iconBg: "bg-blue-100",
        };
      case "work":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "text-green-600",
          dot: "bg-green-400",
          iconBg: "bg-green-100",
        };
      case "self":
        return {
          bg: "bg-orange-50",
          border: "border-orange-200",
          icon: "text-orange-600",
          dot: "bg-orange-400",
          iconBg: "bg-orange-100",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: "text-gray-600",
          dot: "bg-gray-400",
          iconBg: "bg-gray-100",
        };
    }
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTextInput("");
    } else {
      // All questions completed
      onComplete?.(newAnswers);
      setIsVisible(false);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTextInput("");
    } else {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || !currentQuestion) {
    return null;
  }

  const categoryStyle = getCategoryStyle(currentQuestion.category);

  return (
    <div className="space-y-6">
      {/* Progress indicators */}
      <div className="flex space-x-2">
        {mockQuestions.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              index <= currentQuestionIndex ? "bg-purple-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Question Card */}
      <div
        className={`card-floating ${categoryStyle.bg} ${categoryStyle.border} border-l-4 p-4`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 ${categoryStyle.iconBg} rounded-xl flex items-center justify-center`}
            >
              <QuestionMarkCircleIcon
                className={`w-5 h-5 ${categoryStyle.icon}`}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 ${categoryStyle.dot} rounded-full animate-pulse`}
                ></div>
                <span className="font-semibold text-gray-900 text-sm capitalize">
                  {currentQuestion.category} Question
                </span>
                <span className="text-xs font-medium text-gray-500">
                  {currentQuestionIndex + 1} of {mockQuestions.length}
                </span>
              </div>
              {currentQuestion.personName && (
                <div
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium ${categoryStyle.icon} ${categoryStyle.bg} rounded-full border ${categoryStyle.border} mt-1`}
                >
                  About {currentQuestion.personName}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-600 transition-colors flex items-center justify-center"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight">
            {currentQuestion.text}
          </h3>

          {/* Answer Options */}
          {currentQuestion.type === "chips" && currentQuestion.options && (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="text-left px-6 py-4 bg-white/80 hover:bg-white border-2 border-gray-200 hover:border-purple-300 rounded-2xl text-gray-800 hover:text-gray-900 hover:scale-[1.02] transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 ${categoryStyle.dot} rounded-full opacity-60`}
                    ></div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === "text" && (
            <div className="space-y-4">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your answer..."
                className="w-full px-6 py-4 bg-white/70 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-purple-300 transition-colors"
              />
              <button
                onClick={() => handleAnswer(textInput)}
                disabled={!textInput.trim()}
                className="btn-minimal bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>Submit</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center pt-4 border-t border-gray-200">
          <button
            onClick={handleSkip}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors px-4 py-2"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyQuestions;
