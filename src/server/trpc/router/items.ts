import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

export const itemsRouter = router({
  createDummyItem: publicProcedure
    .mutation(async ({ ctx, input }) => {
      // const dummyItem = ctx.prisma.item.create({
      //   data: {
      //     name: 'dummy',
      //     brand: 'dummy',
      //     description: 'dummy',
      //     sex: 'MALE',
      //     price: 0,
      //     image: 
      //     quantity: 0,
      //     category: 'dummy',
      //   }
      // });
      // return {
      //   greeting: `Hello ${input?.text ?? 'world'}`
      // };
    }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // })
});
