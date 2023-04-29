import { z } from 'zod';

// * Items
export const SizeNameSchema = z.enum(['XS', 'S', 'M', 'L', 'XL']);
export const SexSchema = z.enum(['MALE', 'FEMALE', 'UNISEX']);
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
          name: SizeNameSchema,
          available: z.string()
        })
      )
    })
  )
});

export const UpdateItemSchema = CreateItemSchema.extend({ id: z.string() });

export const FilterItemsSchema = z.object({
  sortBy: z.string().optional(),
  sexNames: z.array(z.string()).optional(),
  colorNames: z.array(z.string()).optional(),
  sizeNames: z.array(SizeNameSchema).or(z.undefined()),
  fabricNames: z.array(z.string()).optional(),
  categoryNames: z.array(z.string()).optional()
});

export const GetItemsSchema = FilterItemsSchema.optional();

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

// * Cart

export const AddItemToCartSchema = z.object({
  itemId: z.string(),
  sizeId: z.string(),
  colorId: z.string()
});

export const RemoveItemFromCartSchema = z.object({
  orderItemId: z.string()
});

// * Orders

export const CreateOrderSchema = z.object({
  address: z.string().min(3).max(50),
  city: z.string().min(3).max(50),
  zipCode: z.string().min(1).max(50)
});
