import {
  Person,
  DailyAction,
  InboxItem,
  Circle,
  Tag,
  AdviceResponse,
} from "../types";

export const mockPeople: Person[] = [
  {
    id: "1",
    name: "Ananya Sharma",
    email: "ananya@example.com",
    phone: "+91 98765 43210",
    avatar:
      "https://ui-avatars.com/api/?name=Ananya+Sharma&background=4F46E5&color=fff",
    relation: "family",
    circle: ["family"],
    lastContact: new Date("2024-09-20"),
    nextMilestone: {
      type: "birthday",
      date: new Date("2024-10-15"),
      description: "Birthday celebration",
    },
    healthScore: 85,
    tags: ["family", "mumbai", "doctor"],
    cadence: {
      frequency: "weekly",
      lastContact: new Date("2024-09-20"),
      overdue: false,
    },
    notes: [
      {
        id: "n1",
        content:
          "Started new job at Apollo Hospital. Very excited about the pediatrics department.",
        date: new Date("2024-09-15"),
        tags: ["work", "hospital"],
        personId: "1",
      },
    ],
    promises: [
      {
        id: "p1",
        description: "Send photos from Goa trip",
        dueDate: new Date("2024-09-30"),
        completed: false,
        personId: "1",
        priority: "medium",
      },
    ],
    interactions: [
      {
        id: "i1",
        type: "call",
        date: new Date("2024-09-20"),
        description: "Caught up about her new job and weekend plans",
        personId: "1",
        sentiment: "positive",
      },
    ],
  },
  {
    id: "2",
    name: "Rahul Mehta",
    email: "rahul@techstartup.com",
    avatar:
      "https://ui-avatars.com/api/?name=Rahul+Mehta&background=0D9488&color=fff",
    relation: "close",
    circle: ["close", "work"],
    lastContact: new Date("2024-09-18"),
    nextMilestone: {
      type: "followup",
      date: new Date("2024-09-28"),
      description: "Check on startup funding round",
    },
    healthScore: 70,
    tags: ["startup", "tech", "mumbai", "college"],
    cadence: {
      frequency: "monthly",
      lastContact: new Date("2024-09-18"),
      overdue: false,
    },
    notes: [
      {
        id: "n2",
        content: "Got promoted to CTO! Big funding round coming up in October.",
        date: new Date("2024-09-10"),
        tags: ["promotion", "funding"],
        personId: "2",
      },
    ],
    promises: [],
    interactions: [
      {
        id: "i2",
        type: "message",
        date: new Date("2024-09-18"),
        description: "Congratulated him on the promotion news",
        personId: "2",
        sentiment: "positive",
      },
    ],
  },
  {
    id: "3",
    name: "Priya Kapoor",
    email: "priya.k@design.com",
    avatar:
      "https://ui-avatars.com/api/?name=Priya+Kapoor&background=F59E0B&color=fff",
    relation: "friends",
    circle: ["friends"],
    lastContact: new Date("2024-08-25"),
    healthScore: 45,
    tags: ["design", "pune", "travel"],
    cadence: {
      frequency: "monthly",
      lastContact: new Date("2024-08-25"),
      overdue: true,
    },
    notes: [
      {
        id: "n3",
        content:
          "Planning a solo Europe trip for December. Looking for travel buddies.",
        date: new Date("2024-08-20"),
        tags: ["travel", "europe"],
        personId: "3",
      },
    ],
    promises: [
      {
        id: "p2",
        description: "Share design portfolio feedback",
        dueDate: new Date("2024-09-01"),
        completed: false,
        personId: "3",
        priority: "high",
      },
    ],
    interactions: [
      {
        id: "i3",
        type: "meeting",
        date: new Date("2024-08-25"),
        description: "Coffee catch-up in Bandra",
        personId: "3",
        sentiment: "positive",
      },
    ],
  },
  {
    id: "4",
    name: "Dad (Suresh)",
    email: "suresh@gmail.com",
    phone: "+91 98765 00001",
    avatar: "https://ui-avatars.com/api/?name=Dad&background=6366F1&color=fff",
    relation: "family",
    circle: ["family"],
    lastContact: new Date("2024-09-24"),
    nextMilestone: {
      type: "meeting",
      date: new Date("2024-09-29"),
      description: "Doctor appointment (check-up)",
    },
    healthScore: 90,
    tags: ["family", "delhi", "health"],
    cadence: {
      frequency: "weekly",
      lastContact: new Date("2024-09-24"),
      overdue: false,
    },
    notes: [
      {
        id: "n4",
        content:
          "Blood pressure slightly high. Doctor recommended more walking and less salt.",
        date: new Date("2024-09-15"),
        tags: ["health", "doctor"],
        personId: "4",
      },
    ],
    promises: [
      {
        id: "p3",
        description: "Call every Sunday evening",
        dueDate: new Date("2024-09-29"),
        completed: false,
        personId: "4",
        priority: "high",
      },
    ],
    interactions: [
      {
        id: "i4",
        type: "call",
        date: new Date("2024-09-24"),
        description:
          "Weekly family call, discussed health and retirement plans",
        personId: "4",
        sentiment: "positive",
      },
    ],
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram@company.com",
    avatar:
      "https://ui-avatars.com/api/?name=Vikram+Singh&background=EF4444&color=fff",
    relation: "work",
    circle: ["work"],
    lastContact: new Date("2024-09-25"),
    nextMilestone: {
      type: "meeting",
      date: new Date("2024-09-30"),
      description: "Project review meeting",
    },
    healthScore: 80,
    tags: ["work", "manager", "project"],
    cadence: {
      frequency: "weekly",
      lastContact: new Date("2024-09-25"),
      overdue: false,
    },
    notes: [],
    promises: [
      {
        id: "p4",
        description: "Submit quarterly report",
        dueDate: new Date("2024-09-30"),
        completed: false,
        personId: "5",
        priority: "high",
      },
    ],
    interactions: [
      {
        id: "i5",
        type: "meeting",
        date: new Date("2024-09-25"),
        description: "Sprint planning and goal setting",
        personId: "5",
        sentiment: "neutral",
      },
    ],
  },
];

export const mockDailyActions: DailyAction[] = [
  {
    id: "da1",
    title: "Wish Ananya Happy Birthday",
    description:
      "Her birthday is in 3 weeks. Perfect time to plan something special.",
    type: "birthday",
    priority: "high",
    personId: "1",
    personName: "Ananya Sharma",
    personAvatar:
      "https://ui-avatars.com/api/?name=Ananya+Sharma&background=4F46E5&color=fff",
    aiDraft:
      "Happy early birthday, Ananya! 🎂 Want to plan something special this year? Maybe dinner at that place you mentioned?",
    dueDate: new Date("2024-10-15"),
    completed: false,
    tags: ["birthday", "family"],
  },
  {
    id: "da2",
    title: "Follow up with Rahul",
    description: "Check how his funding round is going. Last spoke 8 days ago.",
    type: "followup",
    priority: "medium",
    personId: "2",
    personName: "Rahul Mehta",
    personAvatar:
      "https://ui-avatars.com/api/?name=Rahul+Mehta&background=0D9488&color=fff",
    aiDraft:
      "Hey Rahul! How's the funding round going? Still on track for October? Let me know if you need any connections.",
    completed: false,
    tags: ["work", "startup"],
  },
  {
    id: "da3",
    title: "Reconnect with Priya",
    description:
      "Haven't talked in over a month. She mentioned Europe trip plans.",
    type: "checkin",
    priority: "high",
    personId: "3",
    personName: "Priya Kapoor",
    personAvatar:
      "https://ui-avatars.com/api/?name=Priya+Kapoor&background=F59E0B&color=fff",
    aiDraft:
      "Hey Priya! It's been too long. How are those Europe trip plans coming along? Would love to catch up soon!",
    completed: false,
    tags: ["friends", "overdue"],
  },
  {
    id: "da4",
    title: "Send Goa photos to Ananya",
    description: "Promised to send these 6 days ago. Don't want to forget!",
    type: "promise",
    priority: "medium",
    personId: "1",
    personName: "Ananya Sharma",
    personAvatar:
      "https://ui-avatars.com/api/?name=Ananya+Sharma&background=4F46E5&color=fff",
    aiDraft:
      "Finally getting around to this! Here are those Goa photos I promised 📸",
    dueDate: new Date("2024-09-30"),
    completed: false,
    tags: ["promise", "photos"],
  },
  {
    id: "da5",
    title: "Check in on Dad's health",
    description: "Doctor appointment is this Sunday. See how he's feeling.",
    type: "checkin",
    priority: "high",
    personId: "4",
    personName: "Dad (Suresh)",
    personAvatar:
      "https://ui-avatars.com/api/?name=Dad&background=6366F1&color=fff",
    aiDraft:
      "Hi Dad! How are you feeling before the doctor visit on Sunday? Remember to ask about the BP medication.",
    completed: false,
    tags: ["family", "health"],
  },
];

export const mockInboxItems: InboxItem[] = [
  {
    id: "in1",
    type: "birthday_detected",
    title: "Ananya's birthday coming up",
    description: "October 15th is in 19 days. Time to plan something special?",
    personId: "1",
    personName: "Ananya Sharma",
    date: new Date("2024-09-26"),
    actionable: true,
    suggestedActions: [
      "Plan birthday celebration",
      "Send gift",
      "Create group chat",
    ],
    dismissed: false,
  },
  {
    id: "in2",
    type: "relationship_insight",
    title: "Long gap with Priya",
    description:
      "You haven't connected with Priya in 32 days. She mentioned Europe travel plans.",
    personId: "3",
    personName: "Priya Kapoor",
    date: new Date("2024-09-25"),
    actionable: true,
    suggestedActions: [
      "Send message",
      "Plan coffee meetup",
      "Ask about travel",
    ],
    dismissed: false,
  },
  {
    id: "in3",
    type: "overdue_promise",
    title: "Portfolio feedback overdue",
    description:
      "You promised Priya feedback on her design portfolio 25 days ago.",
    personId: "3",
    personName: "Priya Kapoor",
    date: new Date("2024-09-24"),
    actionable: true,
    suggestedActions: [
      "Review portfolio",
      "Send feedback",
      "Apologize for delay",
    ],
    dismissed: false,
  },
  {
    id: "in4",
    type: "job_change",
    title: "Rahul got promoted to CTO",
    description: "Detected from LinkedIn activity. Major career milestone!",
    personId: "2",
    personName: "Rahul Mehta",
    date: new Date("2024-09-10"),
    actionable: true,
    suggestedActions: [
      "Congratulate him",
      "Send congratulatory gift",
      "Plan celebration",
    ],
    dismissed: false,
  },
];

export const mockCircles: Circle[] = [
  {
    id: "c1",
    name: "Family",
    type: "family",
    members: ["1", "4"],
    healthScore: 88,
    lastGroupActivity: new Date("2024-09-22"),
    upcomingEvents: [
      {
        type: "birthday",
        date: new Date("2024-10-15"),
        description: "Ananya's birthday",
      },
    ],
  },
  {
    id: "c2",
    name: "Close Circle",
    type: "close",
    members: ["2"],
    healthScore: 70,
    lastGroupActivity: new Date("2024-09-18"),
    upcomingEvents: [],
  },
  {
    id: "c3",
    name: "Work Team",
    type: "work",
    members: ["5", "2"],
    healthScore: 75,
    lastGroupActivity: new Date("2024-09-25"),
    upcomingEvents: [
      {
        type: "meeting",
        date: new Date("2024-09-30"),
        description: "Quarterly review",
      },
    ],
  },
];

export const mockTags: Tag[] = [
  {
    id: "t1",
    name: "Mumbai",
    type: "place",
    usageCount: { people: 3, memories: 15, activities: 8 },
    color: "#4F46E5",
  },
  {
    id: "t2",
    name: "Startup",
    type: "topic",
    usageCount: { people: 2, memories: 8, activities: 5 },
    color: "#0D9488",
  },
  {
    id: "t3",
    name: "Family",
    type: "organization",
    usageCount: { people: 2, memories: 20, activities: 12 },
    color: "#F59E0B",
  },
  {
    id: "t4",
    name: "Health",
    type: "topic",
    usageCount: { people: 2, memories: 6, activities: 3 },
    color: "#EF4444",
  },
];

export const mockAdviceResponses: AdviceResponse[] = [
  {
    id: "ar1",
    type: "message_draft",
    content:
      "Hey Priya! It's been way too long. How are those Europe trip plans coming along? I'd love to catch up and hear all about it soon!",
    tone: "casual",
    confidence: 0.85,
    reasoning:
      "Casual tone matches your usual style with Priya. References her recent Europe trip interest to show you remember.",
  },
  {
    id: "ar2",
    type: "message_draft",
    content:
      "Hi Priya, I hope you're doing well. I've been thinking about our last conversation regarding your Europe travel plans. Would you like to meet for coffee this week to catch up?",
    tone: "formal",
    confidence: 0.72,
    reasoning:
      "More formal approach if you prefer professional communication style.",
  },
  {
    id: "ar3",
    type: "action_suggestion",
    content:
      "Plan a coffee meetup at that café in Bandra you both like, or suggest a virtual catch-up if she's busy with travel planning.",
    tone: "warm",
    confidence: 0.8,
    reasoning:
      "Based on your previous meeting location and her current interests.",
  },
];

// Helper functions for generating more mock data
export const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const getPersonById = (id: string): Person | undefined => {
  return mockPeople.find((person) => person.id === id);
};

export const getActionsByPerson = (personId: string): DailyAction[] => {
  return mockDailyActions.filter((action) => action.personId === personId);
};

export const getOverdueActions = (): DailyAction[] => {
  return mockDailyActions.filter(
    (action) =>
      !action.completed && action.dueDate && action.dueDate < new Date()
  );
};
