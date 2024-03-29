export const AUTHOR_NAME = 'Norbert Matynia';
export const WEBSITE_NAME = 'Impreda';
export const WEBSITE_URL =
  process.env.NODE_ENV === 'production' ? 'https://impreda.vercel.app' : 'localhost:3000';

export const SIZE_OPTIONS = [
  { name: 'XS', key: 'XS' },
  { name: 'S', key: 'S' },
  { name: 'M', key: 'M' },
  { name: 'L', key: 'L' },
  { name: 'XL', key: 'XL' },
  { name: 'XXL', key: 'XXL' }
];

export const SEX_OPTIONS = [
  { name: 'Male', key: 'MALE' },
  { name: 'Female', key: 'FEMALE' },
  { name: 'Unisex', key: 'UNISEX' }
];

export const COLOR_OPTIONS = [
  { name: 'Red', key: 'red', hex: '#FF0000' },
  { name: 'Blue', key: 'blue', hex: '#323ea8' },
  { name: 'Green', key: 'green', hex: '#00c469' },
  { name: 'Yellow', key: 'yellow', hex: '#d9e000' },
  { name: 'Black', key: 'black', hex: '#141414' },
  { name: 'White', key: 'white', hex: '#f7f7f7' },
  { name: 'Pink', key: 'pink', hex: '#ff38e4' },
  { name: 'Purple', key: 'purple', hex: '#bb00ff' },
  { name: 'Orange', key: 'orange', hex: '#ffc117' },
  { name: 'Brown', key: 'brown', hex: '#52482e' },
  { name: 'Grey', key: 'grey', hex: '#919191' }
];

export const FABRIC_OPTIONS = [
  { name: 'Cotton', key: 'cotton' },
  { name: 'Silk', key: 'silk' },
  { name: 'Leather', key: 'leather' },
  { name: 'Wool', key: 'wool' },
  { name: 'Linen', key: 'linen' },
  { name: 'Polyester', key: 'polyester' },
  { name: 'Rayon', key: 'rayon' },
  { name: 'Nylon', key: 'nylon' },
  { name: 'Denim', key: 'denim' },
  { name: 'Canvas', key: 'canvas' },
  { name: 'Velvet', key: 'velvet' }
];

export const SORT_OPTIONS = [
  { name: 'Popularity', key: 'popularity' },
  { name: 'Price: Low to High', key: 'priceAsc' },
  { name: 'Price: High to Low', key: 'priceDesc' },
  { name: 'Newest', key: 'newest' },
  { name: 'Oldest', key: 'oldest' }
];
