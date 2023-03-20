import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

const IteamCreationSchema = z.object({
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
        }))
    })),
})

export const itemsRouter = router({
  createItem: publicProcedure
    .input(IteamCreationSchema)
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.item.create({
        data: {
          name: input.name,
          brand: input.brand,
          sex: input.sex,
          price: input.price,
          description: input.description,
          fabrics: input.fabrics,
          category: {
            connect: {
              id: input.category
            }
          }
        }
      });

      for (const color of input.colors) {
        let colorAvailibility = 0;
        const sizesIds = [];
        for (const size of color.sizes) {
          const _size = await ctx.prisma.size.create({
            data: {
              name: size.name,
              available: Number(size.available),
              items: {
                connect: {
                  id: item.id
                }
              }
            }
          })
          colorAvailibility += Number(size.available);
          sizesIds.push({ id: _size.id })
        }

        await ctx.prisma.color.create({
          data: {
            name: color.name,
            available: colorAvailibility,
            hex: color.hex,
            size: {
              connect: sizesIds
            },
            items: {
              connect: {
                id: item.id
              }
            }
          }
        })
      }


      return {
        itemId: item.id,
      }
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // })
});
