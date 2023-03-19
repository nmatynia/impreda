import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

export const itemsRouter = router({
  createItem: publicProcedure.input(
    z.object({
      name: z.string(),
      brand: z.string(),
      price: z.number(),
      sex: z.enum(['MALE', 'FEMALE', 'UNISEX']),
      description: z.string(),
      fabrics: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.item.create({
        data: {
          name: input.name,
          brand: input.brand,
          sex: input.sex,
          price: input.price,
          description: input.description,
          fabrics: input.fabrics
        }
      });
      return {
        itemId: item.id,
      }
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // })
});
