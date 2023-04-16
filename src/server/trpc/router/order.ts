import { CreateOrderSchema } from '../../../utils/validation';
import { router, publicProcedure, adminProcedure, protectedProcedure } from '../trpc';

export const orderRouter = router({
  createOrder: protectedProcedure.input(CreateOrderSchema).mutation(async ({ ctx, input }) => {
    const cart = await ctx.prisma.cart.findUnique({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        items: true
      }
    });

    if (!cart) throw new Error('Cart is empty');

    await ctx.prisma.order.create({
      data: {
        user: {
          connect: {
            id: ctx.session.user.id
          }
        },
        address: input.address,
        city: input.city,
        zipCode: input.zipCode,
        items: {
          connect: cart.items.map(item => ({ id: item.id }))
        }
      }
    });

    // await ctx.prisma.cart.delete({
    //   where: {
    //     userId: ctx.session.user.id
    //   }
    // });

    return true;
  })
});
