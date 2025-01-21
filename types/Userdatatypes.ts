export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: string;
}

export interface FavoriteContent {
  id: string;
  title: string;
}

export interface Userdatatypes {
  id?: number
  name: string;
  email: string;
  isVip: boolean;
  vipExpirationDate: number;
  lastLogin: string;
  recentlyViewed: string[];
  transactions: Transaction[];
  favorites: FavoriteContent[];
}

export type LinkItem = {
  id: number;
  name: string;
  link: string;
  category?: string
  createdAt: string;
};
