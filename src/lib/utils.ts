export const DAY_NAMES: Record<number, string> = {
  0: "კვირა",
  1: "ორშაბათი",
  2: "სამშაბათი",
  3: "ოთხშაბათი",
  4: "ხუთშაბათი",
  5: "პარასკევი",
  6: "შაბათი",
};

export function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ახლა";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function slaRemaining(submittedAt: string, slaMinutes: number): string {
  const elapsed = (Date.now() - new Date(submittedAt).getTime()) / 60000;
  const remaining = Math.max(0, Math.round(slaMinutes - elapsed));
  return `${remaining}m`;
}

export function formatStatus(status: string): string {
  const map: Record<string, string> = {
    NEW: "New",
    ASSIGNED: "Assigned",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    PAUSED: "Paused",
  };
  return map[status] || status;
}
