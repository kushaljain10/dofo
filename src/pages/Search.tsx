import React, { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChatBubbleLeftEllipsisIcon,
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon,
  MicrophoneIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { SearchResult } from "../types";
import { mockPeople, mockAdviceResponses } from "../data/mockData";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock user name - in real app, get from context/storage
  const userName = "Alex";

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowSuggestions(true);
      setIsLoading(false);
      return;
    }

    // Debounce search to avoid flickering
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const detectIntent = (text: string) => {
    const lowerText = text.toLowerCase().trim();

    // Enhanced ADD keywords for saving information
    const addKeywords = [
      "add",
      "note",
      "remember",
      "save",
      "promise",
      "record",
      "log",
      "track",
      "remind me",
      "don't forget",
      "meeting with",
      "birthday",
      "anniversary",
      "deadline",
      "task",
      "todo",
      "schedule",
      "appointment",
      "event",
    ];

    // Enhanced ASK keywords for advice/help
    const askKeywords = [
      "how",
      "what",
      "why",
      "when",
      "where",
      "advice",
      "suggest",
      "help",
      "should",
      "gift",
      "recommend",
      "tell me",
      "explain",
      "guide",
      "write",
      "draft",
      "compose",
      "create",
      "generate",
      "ideas",
      "tips",
      "can you",
      "please",
      "help me",
      "should i",
    ];

    if (addKeywords.some((keyword) => lowerText.includes(keyword))) {
      return "add";
    }
    if (askKeywords.some((keyword) => lowerText.includes(keyword))) {
      return "ask";
    }
    return "search";
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    // Clear loading state when typing
    if (isLoading && value !== query) {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);

    // AI automatically detects user intent
    const detectedIntent = detectIntent(query);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (detectedIntent === "search") {
      // Search through people, notes, interactions
      const peopleResults: SearchResult[] = mockPeople
        .filter(
          (person) =>
            person.name.toLowerCase().includes(query.toLowerCase()) ||
            person.tags.some((tag) =>
              tag.toLowerCase().includes(query.toLowerCase())
            )
        )
        .map((person) => ({
          type: "person" as const,
          id: person.id,
          title: person.name,
          description: `${person.relation} • Last contact: ${
            person.lastContact?.toLocaleDateString() || "Never"
          }`,
          relevanceScore: 0.8,
          personId: person.id,
        }));

      // Search through notes
      const noteResults: SearchResult[] = mockPeople
        .flatMap((person) =>
          person.notes.map((note) => ({
            type: "note" as const,
            id: note.id,
            title: `Note about ${person.name}`,
            description: note.content,
            date: note.date,
            relevanceScore: 0.6,
            personId: person.id,
          }))
        )
        .filter((note) =>
          note.description.toLowerCase().includes(query.toLowerCase())
        );

      setResults([...peopleResults, ...noteResults]);
    } else if (detectedIntent === "ask") {
      // Generate AI advice
      const adviceResults: SearchResult[] = mockAdviceResponses.map(
        (response) => ({
          type: "advice" as const,
          id: response.id,
          title: `AI Suggestion (${Math.round(
            response.confidence * 100
          )}% confident)`,
          description: response.content,
          relevanceScore: response.confidence,
        })
      );

      setResults(adviceResults);
    }

    setIsLoading(false);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleQueryChange(suggestion);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        handleVoiceMessage(audioBlob);

        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);

      // Start duration counter
      recordingIntervalRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    setIsRecording(false);
    setRecordingDuration(0);
  };

  const handleVoiceMessage = async (audioBlob: Blob) => {
    setIsLoading(true);

    // Simulate voice transcription and processing
    setTimeout(() => {
      const transcribedText = "Help me write a birthday message for my sister";
      setQuery(transcribedText);
      handleQueryChange(transcribedText);
    }, 2000);
  };

  const handleVoiceButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const suggestions = {
    search: [
      "Ananya birthday plans",
      "Mumbai friends",
      "work meetings this week",
      "family health updates",
    ],
    add: [
      "Remember: Rahul likes hiking",
      "Promise: Call mom this Sunday",
      "Note: Dad needs BP medication",
      "Event: Ananya graduation party",
    ],
    ask: [
      "How to reconnect with old friends?",
      "Gift ideas for Dad under ₹3000",
      "How to apologize for being late?",
      "What to write in birthday message?",
    ],
  };

  return (
    <div className="min-h-screen gradient-minimal">
      {/* Header with Holographic Orb */}
      <div className="relative px-6 pt-16 pb-6">
        {/* Background */}
        <div className="absolute inset-0 gradient-holographic opacity-30"></div>

        <div className="relative text-center">
          {/* AI Assistant Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-full mb-6 backdrop-blur-md">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">AI Chat</span>
            <span className="text-sm font-bold text-purple-600">DoFo</span>
          </div>

          {/* Voice Recording Orb */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleVoiceButtonClick}
              className={`relative w-24 h-24 rounded-full transition-all duration-300 ${
                isRecording
                  ? "bg-red-500 animate-pulse shadow-lg shadow-red-500/50"
                  : "orb-holographic animate-breathe hover:scale-110"
              }`}
            >
              {/* Microphone Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isRecording ? (
                  <StopIcon className="w-8 h-8 text-white" />
                ) : (
                  <MicrophoneIcon className="w-8 h-8 text-white" />
                )}
              </div>

              {/* Recording Animation Ring */}
              {isRecording && (
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
              )}
            </button>
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-100 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-red-700">
                  Recording {formatRecordingTime(recordingDuration)}
                </span>
              </div>
            </div>
          )}

          {/* AI Assistant Greeting */}
          <div className="max-w-sm mx-auto mb-6">
            <p className="text-sm text-gray-500 mb-2">AI assistant</p>
            {isRecording ? (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  <span className="text-red-600">Listening...</span>
                </h1>
                <p className="text-lg text-gray-700">
                  Tap the <span className="text-red-600">stop</span> button when
                  you're done
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Greetings,{" "}
                  <span className="text-purple-600">{userName}!</span>
                </h1>
                <p className="text-lg text-gray-700">
                  <span className="text-purple-600">Tap the orb</span> to speak
                  or type below
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Multi-use Search Bar - Always Visible */}
      <div className="px-6 pb-6">
        <div className="card-floating p-6">
          <div className="relative">
            <div className="flex items-center space-x-4 mb-4">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    handleSearch();
                  }
                }}
                placeholder="Search, add, or ask for advice..."
                className="flex-1 px-6 py-4 bg-gray-50 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-300 transition-all"
              />
              <div className="flex items-center space-x-2">
                {isLoading ? (
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-purple-600 animate-pulse" />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (query.trim()) {
                        handleSearch();
                      }
                    }}
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                  >
                    <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="px-6 pb-32">
        {!query && (
          <div className="space-y-6">
            {/* Quick Action Chips */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSuggestionClick("Write an email")}
                className="card-glass p-6 text-left group hover:scale-105 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                  <DocumentTextIcon className="w-5 h-5 text-purple-600" />
                </div>
                <p className="font-medium text-gray-900 mb-1">Write an email</p>
              </button>

              <button
                onClick={() => handleSuggestionClick("Tell me a fun fact")}
                className="card-glass p-6 text-left group hover:scale-105 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                  <SparklesIcon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="font-medium text-gray-900 mb-1">
                  Tell me a fun fact
                </p>
              </button>
            </div>

            {/* More Suggestions */}
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => handleSuggestionClick("Give me ideas")}
                className="card-glass p-4 text-left group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <PlusIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="font-medium text-gray-900">Give me ideas</p>
                </div>
              </button>

              <button
                onClick={() => handleSuggestionClick("Help me study")}
                className="card-glass p-4 text-left group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-xl flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                    <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-pink-600" />
                  </div>
                  <p className="font-medium text-gray-900">Help me study</p>
                </div>
              </button>

              <button
                onClick={() => handleSuggestionClick("Plan a trip a like")}
                className="card-glass p-4 text-left group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <MagnifyingGlassIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <p className="font-medium text-gray-900">
                    Plan a trip a like
                  </p>
                </div>
              </button>

              <button
                onClick={() =>
                  handleSuggestionClick("Quiz me on world knowledge")
                }
                className="card-glass p-4 text-left group hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <UserIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="font-medium text-gray-900">Quiz me on world</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Results</h3>
            <div className="space-y-3">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:border-primary-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {result.type === "person" && (
                        <UserIcon className="w-5 h-5 text-gray-400" />
                      )}
                      {result.type === "note" && (
                        <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                      )}
                      {result.type === "interaction" && (
                        <ClockIcon className="w-5 h-5 text-gray-400" />
                      )}
                      {result.type === "advice" && (
                        <SparklesIcon className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900">
                        {result.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {result.description}
                      </p>
                      {result.date && (
                        <p className="text-xs text-gray-500 mt-2">
                          {result.date.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {query && results.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <MagnifyingGlassIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-medium text-gray-900 mb-1">No results found</h3>
            <p className="text-gray-600 text-sm">
              Try different keywords or switch modes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
