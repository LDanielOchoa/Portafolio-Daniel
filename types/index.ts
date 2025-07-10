export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  links: {
    github: string;
    live: string;
  };
} 