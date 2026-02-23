export type TableRequestRowItem = {
  id: string;
  room: {
    number: string;
    type: string;
  };
  request: {
    title: string;
    description: string;
    priority: string;
  };
  timing: {
    submittedAgo: string;
    timeRemaining: string;
  };
  status: string;
  actions: {
    canPause: boolean;
    canComplete: boolean;
    hasMenu: boolean;
  };
};

export const DASHBOARD_TABLE_REQUEST_ROW = [
  {
    id: "req_001",
    room: {
      number: "304",
      type: "Deluxe",
    },
    request: {
      title: "Extra towels",
      description: "Guest requested 2 sets of towels.",
      priority: "high",
    },
    timing: {
      submittedAgo: "10m ago",
      timeRemaining: "15m",
    },
    status: "In Progress",
    actions: {
      canPause: true,
      canComplete: true,
      hasMenu: true,
    },
  },
  {
    id: "req_002",
    room: {
      number: "512",
      type: "Suite",
    },
    request: {
      title: "Room service",
      description: "Breakfast order for 2 - Continental style.",
      priority: "medium",
    },
    timing: {
      submittedAgo: "5m ago",
      timeRemaining: "25m",
    },
    status: "New",
    actions: {
      canPause: false,
      canComplete: true,
      hasMenu: true,
    },
  },
  {
    id: "req_003",
    room: {
      number: "208",
      type: "Standard",
    },
    request: {
      title: "Maintenance",
      description: "AC not cooling properly.",
      priority: "high",
    },
    timing: {
      submittedAgo: "22m ago",
      timeRemaining: "8m",
    },
    status: "In Progress",
    actions: {
      canPause: true,
      canComplete: true,
      hasMenu: true,
    },
  },
  {
    id: "req_004",
    room: {
      number: "415",
      type: "Deluxe",
    },
    request: {
      title: "Pillow request",
      description: "Guest needs hypoallergenic pillows.",
      priority: "low",
    },
    timing: {
      submittedAgo: "35m ago",
      timeRemaining: "0m",
    },
    status: "Completed",
    actions: {
      canPause: false,
      canComplete: false,
      hasMenu: true,
    },
  },
  {
    id: "req_005",
    room: {
      number: "601",
      type: "Presidential Suite",
    },
    request: {
      title: "Turndown service",
      description: "Evening turndown requested for 8 PM.",
      priority: "medium",
    },
    timing: {
      submittedAgo: "2m ago",
      timeRemaining: "58m",
    },
    status: "New",
    actions: {
      canPause: false,
      canComplete: true,
      hasMenu: true,
    },
  },
];

export const MY_TASK_TABLE_REQUEST_ROW = [
  {
    id: "req_001",
    room: {
      number: "304",
      type: "Deluxe",
    },
    request: {
      title: "Extra towels",
      description: "Guest requested 2 sets of towels.",
      priority: "high",
    },
    timing: {
      submittedAgo: "10m ago",
      timeRemaining: "15m",
    },
    status: "In Progress",
    actions: {
      canPause: true,
      canComplete: true,
      hasMenu: true,
    },
  },
  {
    id: "req_002",
    room: {
      number: "512",
      type: "Suite",
    },
    request: {
      title: "Room service",
      description: "Breakfast order for 2 - Continental style.",
      priority: "medium",
    },
    timing: {
      submittedAgo: "5m ago",
      timeRemaining: "25m",
    },
    status: "Assigned",
    actions: {
      canPause: false,
      canComplete: true,
      hasMenu: true,
    },
  },
  {
    id: "req_003",
    room: {
      number: "208",
      type: "Standard",
    },
    request: {
      title: "Maintenance",
      description: "AC not cooling properly.",
      priority: "high",
    },
    timing: {
      submittedAgo: "22m ago",
      timeRemaining: "8m",
    },
    status: "In Progress",
    actions: {
      canPause: true,
      canComplete: true,
      hasMenu: true,
    },
  },
  {
    id: "req_004",
    room: {
      number: "415",
      type: "Deluxe",
    },
    request: {
      title: "Pillow request",
      description: "Guest needs hypoallergenic pillows.",
      priority: "low",
    },
    timing: {
      submittedAgo: "35m ago",
      timeRemaining: "0m",
    },
    status: "Completed",
    actions: {
      canPause: false,
      canComplete: false,
      hasMenu: true,
    },
  },
  {
    id: "req_005",
    room: {
      number: "601",
      type: "Presidential Suite",
    },
    request: {
      title: "Turndown service",
      description: "Evening turndown requested for 8 PM.",
      priority: "medium",
    },
    timing: {
      submittedAgo: "2m ago",
      timeRemaining: "58m",
    },
    status: "Assigned",
    actions: {
      canPause: false,
      canComplete: true,
      hasMenu: true,
    },
  },
];
