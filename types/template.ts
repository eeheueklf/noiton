export interface User {
  name: string;
}
export interface Category {
  id : string;
  name? : string;
}
export interface Template {
  id: string;
  title: string;
  slug:string;
  thumbnail_url: string;
  created_at: string;
  likes_count: { count: number }[]; 
  download_count: number;
  creator: User; 
  category: Category;
}
export interface TemplateDetail {
  id: string;
  title: string;
  slug:string;
  thumbnail_url: string;
  likes_count: { count: number }[]; 
  download_count: number;
  description:string;
  notion_page_id:string;
  creator: User; 
  category: Category;
}