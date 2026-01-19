export type ProjectStatus = 'in_progress' | 'completed';

export interface Project {
  id: string;
  title: string;
  summary: string | null;
  role: string | null;
  tech_stack: string[] | null;
  thumbnail: string | null;
  status: ProjectStatus;
  created_at: string;
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  order: number;
}

export interface ProjectWithImages extends Project {
  project_images: ProjectImage[];
}
