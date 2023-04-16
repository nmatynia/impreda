import { Prisma } from '@prisma/client';

export type ItemType = {
  className?: string;
  id: string;
  brand: string;
  name: string;
  sizes: SizesType[];
  sex: SexType;
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
  category: CategoryType;
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
  name: SizeNameType;
  available: number;
  colors?: ColorsType[];
};

export type CategoryType = {
  id: string;
  name: string;
};

export type Order = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: { item: true };
    };
    user: true;
  };
}>;

export type SexType = 'MALE' | 'FEMALE' | 'UNISEX';
export type SizeNameType = 'XS' | 'S' | 'M' | 'L' | 'XL';
