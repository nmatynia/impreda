export type ItemType = {
  className?: string;
  id: string;
  brand: string;
  name: string;
  sizes: SizesType[];
  sex: 'MALE' | 'FEMALE' | 'UNISEX';
  colors: ColorsType[];
  price: number;
  savedBy: number;
  images: ImageType[];
  description?: string;
  fabrics?: {
    name: string;
    percentage: number;
  }[];
  views?: number;
  category: CategoryType; // TODO change to enum
};

export type ImageType = {
  id: string;
  filename: string;
  url: string | null;
};

export type ColorsType = {
  name: string;
  hex: string;
  available: number;
  sizes?: SizesType[];
};

export type SizesType = {
  name: 'XS' | 'S' | 'M' | 'L' | 'XL';
  available: number;
  colors?: ColorsType[];
};

export type CategoryType = {
  id: string;
  name: string;
};
