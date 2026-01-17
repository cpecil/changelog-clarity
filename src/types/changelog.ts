export type ChangeType = "Added" | "Improved" | "Fixed";
export type RolloutStatus = "Planned" | "Rolling out" | "Complete";

export interface Change {
  type: ChangeType;
  text: string;
}

export interface ChangelogEntry {
  id: string;
  version: string;
  release_date: string;
  summary: string;
  changes: Change[];
  status: RolloutStatus;
  links?: { label: string; url: string }[];
  created_at: string;
}
