import React, { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChatBubbleLeftEllipsisIcon,
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { SearchResult } from "../types";
import { mockPeople, mockAdviceResponses } from "../data/mockData";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState<"search" | "add" | "ask">(
    "search"
  );
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      handleSearch();
    } else {
      setResults([]);
      setShowSuggestions(true);
    }
  }, [query, searchMode]);

  const detectIntent = (text: string) => {
    const addKeywords = ["add", "note", "remember", "save", "promise"];
    const askKeywords = [
      "how",
      "what",
      "advice",
      "suggest",
      "help",
      "should",
      "gift",
    ];

    const lowerText = text.toLowerCase();

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
    const intent = detectIntent(value);
    setSearchMode(intent);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (searchMode === "search") {
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
    } else if (searchMode === "ask") {
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

  const getModeColor = () => {
    switch (searchMode) {
      case "add":
        return "border-green-300 ring-green-500 bg-green-50";
      case "ask":
        return "border-purple-300 ring-purple-500 bg-purple-50";
      default:
        return "border-primary-300 ring-primary-500 bg-white";
    }
  };

  const getModeIcon = () => {
    switch (searchMode) {
      case "add":
        return <PlusIcon className="w-5 h-5 text-green-600" />;
      case "ask":
        return (
          <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-purple-600" />
        );
      default:
        return <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getModeText = () => {
    switch (searchMode) {
      case "add":
        return "Add mode: Save notes, promises, or events";
      case "ask":
        return "Ask mode: Get AI advice and suggestions";
      default:
        return "Search mode: Find people, notes, or interactions";
    }
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
      <div className="relative px-6 pt-16 pb-8">
        {/* Background */}
        <div className="absolute inset-0 gradient-holographic opacity-30"></div>
        
        <div className="relative text-center">
          {/* AI Assistant Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-full mb-8 backdrop-blur-md">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">AI Chat</span>
            <span className="text-sm font-bold text-purple-600">DoFo</span>
          </div>

          {/* Holographic Orb */}
          <div className="flex justify-center mb-8">
            <div className="orb-holographic animate-breathe mx-auto"></div>
          </div>

          {/* AI Assistant Greeting */}
          <div className="max-w-sm mx-auto mb-8">
            <p className="text-sm text-gray-500 mb-2">AI assistant</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Greetings, <span className="text-purple-600">human!</span>
            </h1>
            <p className="text-lg text-gray-700">
              How may I <span className="text-purple-600">assist you</span> today?
            </p>
          </div>
        </div>
      </div>

      {/* Suggestion Chips */}
      <div className="px-6 pb-8">
        {!query && (
          <div className="space-y-4">
            {/* Quick Action Chips */}
            <div className="grid grid-cols-2 gap-3">
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
                <p className="font-medium text-gray-900 mb-1">Tell me a fun fact</p>
              </button>
            </div>

            {/* More Suggestions */}
            <div className="grid grid-cols-1 gap-3">
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
                  <p className="font-medium text-gray-900">Plan a trip a like</p>
                </div>
              </button>

              <button
                onClick={() => handleSuggestionClick("Quiz me on world knowledge")}
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
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              {searchMode === "ask" ? "AI Suggestions" : "Results"}
            </h3>
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

      {/* Floating Input Bar */}
      <div className="fixed bottom-6 left-6 right-6">
        <div className="relative">
          <div className="card-glass px-6 py-4 rounded-full backdrop-blur-md border border-white/30">
            <div className="flex items-center space-x-4">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Message AI assistant"
                className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <div className="flex items-center space-x-2">
                {isLoading ? (
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-purple-600 animate-pulse" />
                  </div>
                ) : (
                  <button 
                    onClick={handleSearch}
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
