export interface LinkItem {
    id: number;
    name: string;
    link: string;
    category: string;
    createdAt: string;
    reactions?: { [key: string]: number };
  }
  
  export interface Category {
    id: string;
    name: string;
    category: string;
  }
