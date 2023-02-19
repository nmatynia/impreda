import { z } from 'zod';

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
});
