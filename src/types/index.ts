export interface Person {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  relation: "family" | "close" | "friends" | "work" | "other";
  circle?: string[];
  lastContact?: Date;
  contactFrequency: number; // days between contacts
  nextMilestone?: {
    type: "birthday" | "anniversary" | "meeting" | "followup";
    date: Date;
    description: string;
  };
  healthScore: number; // 0-100
  tags: string[];
  cadence?: {
    frequency: "daily" | "weekly" | "monthly" | "quarterly";
    lastContact: Date;
    overdue: boolean;
  };
  notes: Note[];
  promises: Promise[];
  interactions: Interaction[];
}

export interface Note {
  id: string;
  content: string;
  date: Date;
  tags: string[];
  personId: string;
}

export interface Promise {
  id: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  completedDate?: Date;
  personId: string;
  priority: "low" | "medium" | "high";
}

export interface Interaction {
  id: string;
  type: "call" | "message" | "meeting" | "email" | "photo" | "gift";
  date: Date;
  description: string;
  personId: string;
  sentiment?: "positive" | "neutral" | "negative";
}

export interface DailyAction {
  id: string;
  title: string;
  description: string;
  type: "birthday" | "followup" | "promise" | "checkin" | "milestone";
  priority: "high" | "medium" | "low";
  personId: string;
  personName: string;
  personAvatar?: string;
  aiDraft?: string;
  dueDate?: Date;
  completed: boolean;
  tags: string[];
}

export interface Circle {
  id: string;
  name: string;
  type: "family" | "close" | "friends" | "work" | "custom";
  members: string[]; // person IDs
  healthScore: number;
  lastGroupActivity?: Date;
  upcomingEvents: {
    type: string;
    date: Date;
    description: string;
  }[];
}

export interface Tag {
  id: string;
  name: string;
  type: "place" | "activity" | "topic" | "organization" | "event" | "emotion";
  usageCount: {
    people: number;
    memories: number;
    activities: number;
  };
  color?: string;
}

export interface AdviceRequest {
  id: string;
  query: string;
  context: {
    personId?: string;
    situation?: string;
    history?: string[];
  };
  responses: AdviceResponse[];
  timestamp: Date;
}

export interface AdviceResponse {
  id: string;
  type: "message_draft" | "action_suggestion" | "gift_idea" | "general_advice";
  content: string;
  tone?: "casual" | "formal" | "warm" | "professional";
  confidence: number;
  reasoning?: string;
}

export interface InboxItem {
  id: string;
  type:
    | "birthday_detected"
    | "job_change"
    | "photo_memory"
    | "overdue_promise"
    | "relationship_insight";
  title: string;
  description: string;
  personId?: string;
  personName?: string;
  date: Date;
  actionable: boolean;
  suggestedActions?: string[];
  dismissed: boolean;
}

export interface SearchResult {
  type: "person" | "note" | "promise" | "interaction" | "advice";
  id: string;
  title: string;
  description: string;
  date?: Date;
  relevanceScore: number;
  personId?: string;
}

export interface UserPreferences {
  nudgeIntensity: "low" | "medium" | "high";
  quietHours: {
    start: string; // "22:00"
    end: string; // "08:00"
  };
  language: "en" | "hi";
  defaultTone: "casual" | "formal" | "warm" | "professional";
  enableNotifications: boolean;
  dailyQuestionLimit: number;
}
