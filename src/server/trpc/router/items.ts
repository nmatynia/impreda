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
        })
      )
    })
  )
});

export const itemsRouter = router({
  createItem: publicProcedure.input(IteamCreationSchema).mutation(async ({ ctx, input }) => {
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

    // TODO: Perhaphs listen to the ESlint rule and refactor this code
    // eslint-disable-next-line no-restricted-syntax
    for (const color of input.colors) {
      let colorAvailibility = 0;
      const sizesIds = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const size of color.sizes) {
        // eslint-disable-next-line no-await-in-loop
        const { id: sizeId } = await ctx.prisma.size.create({
          data: {
            name: size.name,
            available: Number(size.available),
            items: {
              connect: {
                id: item.id
              }
            }
          }
        });
        colorAvailibility += Number(size.available);
        sizesIds.push({ id: sizeId });
      }

      // eslint-disable-next-line no-await-in-loop
      await ctx.prisma.color.create({
        data: {
          name: color.name,
          available: colorAvailibility,
          hex: color.hex,
          sizes: {
            connect: sizesIds
          },
          items: {
            connect: {
              id: item.id
            }
          }
        }
      });
    }

    return {
      itemId: item.id
    };
  }),
  getListItems: publicProcedure.query(async ({ ctx }) => {
    // TODO: Get rid of this hack and user _count
    // TODO enhance that with filters
    const items = await ctx.prisma.item.findMany({
      select: {
        id: true,
        brand: true,
        name: true,
        price: true,
        views: true,
        images: true,
        savedBy: true
      }
    });
    return items.map(item => ({
      id: item.id,
      brand: item.brand,
      name: item.name,
      price: item.price,
      savedBy: item.savedBy.length,
      images: item.images,
      views: item.views
    }));
  }),
  getItems: publicProcedure.query(async ({ ctx }) => {
    // TODO enhance that with filters
    const items = await ctx.prisma.item.findMany({
      select: {
        id: true,
        brand: true,
        name: true,
        sizes: true,
        colors: true,
        price: true,
        images: true
      }
    });

    return items.map(item => {
      const uniqueSizesNames = [...new Set(item.sizes.map(size => size.name))];

      const sizes = uniqueSizesNames.map(name => ({
        name,
        available: item.sizes
          .filter(size => size.name === name)
          .reduce((acc, curr) => acc + curr.available, 0)
      }));

      return {
        id: item.id,
        brand: item.brand,
        name: item.name,
        sizes,
        colors: item.colors,
        price: item.price,
        images: item.images
      };
    });
  }),

  getItemsIds: publicProcedure.query(async ({ ctx }) => {
    const item = await ctx.prisma.item.findMany({
      select: {
        id: true
      }
    });
    return item;
  }),

  getItem: publicProcedure.input(z.string()).query(async ({ ctx, input: id }) => {
    const item = await ctx.prisma.item.findUnique({
      where: {
        id
      },
      include: {
        sizes: true,
        colors: true,
        category: true,
        images: true
      }
    });
    return item;
    // const uniqueSizesNames = [...new Set(item.sizes.map(size => size.name))];

    // const sizes = uniqueSizesNames.map(name => ({
    //   name,
    //   available: item.sizes
    //     .filter(size => size.name === name)
    //     .reduce((acc, curr) => acc + curr.available, 0)
    // }));
  })
});
