import { z } from 'zod';
import { UserDetailsSchema } from '../../../components/user-account-box/UserAcountBox';

import { router, publicProcedure } from '../trpc';

export const userRouter = router({
  getCurrent: publicProcedure.query(({ ctx }) => {
    const { session } = ctx;
    const userId = session?.user?.id;
    if (!userId) {
      return;
    }
    return ctx.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  }),
  update: publicProcedure.input(UserDetailsSchema).mutation(async ({ ctx, input }) => {
    const { session } = ctx;
    const userId = session?.user?.id;
    if (!userId) {
      return;
    }
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      return;
    }
    return ctx.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        ...input
      }
    })
  })
});
