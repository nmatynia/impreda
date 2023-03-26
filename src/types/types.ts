export type ItemType = {
  className?: string;
  id: string;
  brand: string;
  name: string;
  sizes: {
    name: 'XS' | 'S' | 'M' | 'L' | 'XL';
    available: number;
    colors?: {
      name: string;
      hex: string;
      available: number;
    }[];
  }[]; // Different table for both the size and color so it should be fine having it like that
  sex: 'man' | 'woman' | 'unisex';
  colors: {
    name: string;
    hex: string;
    available: number;
    sizes?: {
      name: 'XS' | 'S' | 'M' | 'L' | 'XL';
      available: number;
    }[];
  }[];
  price: number;
  savedBy: number;
  images: ImageType[];
  description?: string;
  fabrics?: {
    name: string;
    percentage: number;
  }[];
  views?: number;
  category: string; // TODO change to enum
};

export type ImageType = {
  id: string;
  filename: string;
  url: string | null;
};
