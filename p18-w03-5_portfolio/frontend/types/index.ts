export interface ICategory {
  id: string;
  name: string;
}

export interface ISkill {
  id: string;
  name: string;
  icon?: string; // Optional icon for skill
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categories: ICategory[];
  skills: ISkill[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface IStats {
  id: string;
  label: string;
  value: number;
  unit?: string;
}
