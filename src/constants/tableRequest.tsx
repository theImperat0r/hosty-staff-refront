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
