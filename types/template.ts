export interface User {
  name: string;
}

export interface Template {
  id: string;
  title: string;
  thumbnail_url: string;
  view_count: number;
  download_count: number;
  creator: User; 
}