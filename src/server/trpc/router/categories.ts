import { router, publicProcedure } from '../trpc';

export const categoriesRouter = router({
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return {
      categories: categories.map(category => ({ name: category.name, key: category.id }))
    };
  })
});
