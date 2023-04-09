import { z } from 'zod';

// * Items

export const CreateItemSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  sex: z.enum(['MALE', 'FEMALE', 'UNISEX']),
  description: z.string(),
  fabrics: z.string(),
  category: z.string(),
  colors: z.array(
    z.object({
      name: z.string(),
      hex: z.string(),
      sizes: z.array(
        z.object({
          name: z.enum(['XS', 'S', 'M', 'L', 'XL']),
          available: z.string()
        })
      )
    })
  )
});

export const UpdateItemSchema = CreateItemSchema.extend({ id: z.string() });

export const GetItemsSchema = z
  .object({
    sex: z.enum(['MALE', 'FEMALE', 'UNISEX']).optional(),
    colorsNames: z.array(z.string()).optional(),
    sizesNames: z.array(z.enum(['XS', 'S', 'M', 'L', 'XL'])).optional(),
    categoryName: z.string().optional()
    // TODO: Price range, sort by(views, saves , cheapest, most expensive, latest), brand,
  })
  .optional();

// * Users

export const UpdateUserByIdDetailsSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(50).nullish(),
  address: z.string().min(3).max(50).nullish(),
  city: z.string().min(3).max(50).nullish(),
  zipCode: z.string().min(1).max(50).nullish(),
  cardNumber: z.string().min(16).max(19).nullish(),
  phoneNumber: z.string().min(9).max(10).nullish()
});
