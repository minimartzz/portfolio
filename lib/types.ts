export interface Project {
  title: string;
  link?: string | null;
  description: string;
  image?: string | null;
  tags: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  name: string;
}

export type HistoryCategory = "Education" | "Work" | "Project";

export interface HistoryProject {
  title: string;
  description: string;
}

export interface HistoryEntry {
  type: HistoryCategory;
  title: string;
  organization: string | null;
  description: string;
  startDate: string;
  endDate: string | null;
  technologies?: string[];
  icon?: string | null;
  projects?: HistoryProject[];
}

export interface Certs {
  title: string;
  provider: string;
  progress: boolean;
}
