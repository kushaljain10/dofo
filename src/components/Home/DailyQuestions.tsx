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
    text: "What's Ananya's favorite cuisine?",
    type: "chips",
    options: ["Indian", "Chinese", "Italian", "Mexican", "Thai", "Other"],
    personId: "1",
    personName: "Ananya",
  },
  {
    id: "q2",
    category: "preferences",
    text: "How do you prefer to celebrate birthdays?",
    type: "chips",
    options: [
      "Small gathering",
      "Big party",
      "Quiet dinner",
      "Just family",
      "Skip it",
    ],
  },
  {
    id: "q3",
    category: "work",
    text: "What time does Vikram prefer for meetings?",
    type: "chips",
    options: ["Morning", "Afternoon", "Evening", "Flexible"],
    personId: "5",
    personName: "Vikram",
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
        return { gradient: "gradient-purple", bg: "bg-white/20" };
      case "close":
        return { gradient: "gradient-pink", bg: "bg-white/20" };
      case "friends":
        return { gradient: "gradient-blue", bg: "bg-white/20" };
      case "work":
        return { gradient: "gradient-lime", bg: "bg-white/20" };
      case "self":
        return { gradient: "gradient-cyan", bg: "bg-white/20" };
      default:
        return { gradient: "gradient-orange", bg: "bg-white/20" };
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
    <div className="space-y-4">
      {/* Progress indicators */}
      <div className="flex space-x-2">
        {mockQuestions.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              index <= currentQuestionIndex ? "gradient-rainbow" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Question Card */}
      <div className={`card-colorful ${categoryStyle.gradient} p-6`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <QuestionMarkCircleIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">
                Quick Question
              </span>
              {currentQuestion.personName && (
                <div
                  className={`mt-1 px-3 py-1 text-xs font-medium text-white rounded-xl ${categoryStyle.bg}`}
                >
                  About {currentQuestion.personName}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs font-medium text-white/80">
              {currentQuestionIndex + 1} of {mockQuestions.length}
            </span>
            <button
              onClick={handleDismiss}
              className="p-2 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4 leading-tight">
            {currentQuestion.text}
          </h3>

          {/* Answer Options */}
          {currentQuestion.type === "chips" && currentQuestion.options && (
            <div className="flex flex-wrap gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="btn-modern bg-white text-gray-800 hover:bg-gray-50 text-sm font-semibold"
                >
                  {option}
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
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-colors"
              />
              <button
                onClick={() => handleAnswer(textInput)}
                disabled={!textInput.trim()}
                className="btn-modern bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>Submit</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-2"
          >
            Skip this question
          </button>

          <div className="text-xs font-medium text-white/70">
            Helps DoFo give better advice ✨
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuestions;
