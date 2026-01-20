// src/types/changelog.ts

export type ChangeType = "Added" | "Improved" | "Fixed";
export type RolloutStatus = "Planned" | "Rolling out" | "Complete";
export type CategoryType = "feature" | "bugfix" | "security" | "improvement" | "breaking";

export interface Change {
  type: ChangeType;
  text: string;
}

export interface Link {
  label: string;
  url: string;
}

export interface MediaItem {
  type: 'image' | 'video' | 'audio';
  url: string;
  alt?: string;
}

export interface ActionButton {
  label: string;
  onClick?: () => void;
  variant?: 'filled' | 'outlined';
}

export interface ChangelogEntry {
  version: string;
  release_date: string;
  summary: string;
  changes: Change[];
  status: RolloutStatus;
  links?: Link[];
  
  // NEW FIELDS for enhanced features
  header_image?: string;
  category?: CategoryType;
  detailed_info?: string; // Markdown/MDX content
  media?: MediaItem[];
  actions?: ActionButton[];
}