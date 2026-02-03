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
  view_count: number;
  download_count: number;
  creator: User; 
  category: Category;
}