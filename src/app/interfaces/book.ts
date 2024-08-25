import { Author } from "./author";

export interface Book {
    _id: string;  
    title: string;
    description?: string;  
    image?: string;  
    author: Author ;
  }