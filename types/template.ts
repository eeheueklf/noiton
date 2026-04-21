export interface User {
  id: string;
  name: string;
}
export interface Category {
  id : string;
  name? : string;
}
export interface CategoryDetail extends Category{
  path: string;
  parent_id: string | null;
  level: number;
}
export interface Template {
  id: string;
  title: string;
  slug:string;
  thumbnail_url: string;
  created_at: string;
  likes_count: number; 
  download_count: number;
  popular_score:number;
  creator: User; 
  category: Category;
}
export interface TemplateDetail extends Template{
  description:string;
  notion_page_id:string;
}