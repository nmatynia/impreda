import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const categoriesRouter = router({
  getAllCategories: publicProcedure
    .input(z.boolean().optional())
    .query(async ({ ctx, input: showOnlyWithItems }) => {
      const categories = await ctx.prisma.category.findMany({
        select: {
          id: true,
          name: true,
          items: {
            select: {
              sex: true
            }
          }
        }
      });

      if (showOnlyWithItems) {
        return categories
          .filter(({ items }) => items.length > 0)
          .map(({ name, id }) => ({ name, key: id }));
      }

      return categories.map(category => ({ name: category.name, key: category.id }));
    })
});
