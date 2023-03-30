import { TRPCError } from '@trpc/server';
import { UserDetailsSchema } from '../../../components/user-account-box/UserAcountBox';

import { router, publicProcedure, protectedProcedure, adminProcedure } from '../trpc';

export const userRouter = router({
  getCurrent: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session?.user?.id;
    return ctx.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
  }),

  update: publicProcedure.input(UserDetailsSchema).mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }
    return ctx.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        ...input
      }
    });
  }),
  getAllUsers: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        orders: {
          select: {
            items: true
          }
        },
        joinedAt: true
      }
    });

    return users.map(user => {
      const { name, joinedAt, orders, id } = user;

      const joinMonth = joinedAt.toLocaleDateString('en-US', { month: 'short' as const });
      const joinYear = joinedAt.getFullYear();
      const joinDay = joinedAt.getDate();
      const joinDate = `${joinDay} ${joinMonth} ${joinYear}`;

      const totalSpent = orders.reduce((acc, curr) => {
        const total = curr.items.reduce((acc, curr) => acc + curr.price, 0);
        return acc + total;
      }, 0);
      const totalPurchases = orders.length;

      return {
        id,
        name,
        joinDate,
        totalSpent,
        totalPurchases
      };
    });
  })
});
