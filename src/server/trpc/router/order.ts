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

    const uniqueOrderItems = cart.items
      .map(item => item.id)
      .filter((value, index, array) => array.indexOf(value) === index)
      .map(id => ({ id }));

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
          connect: uniqueOrderItems
        }
      }
    });

    await ctx.prisma.cart.delete({
      where: {
        userId: ctx.session.user.id
      }
    });

    return true;
  }),
  getCurrentUserOrders: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        items: {
          include: {
            item: true
          }
        },
        user: true
      }
    });

    return orders;
  }),
  getAllOrders: adminProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      include: {
        items: {
          include: {
            item: true
          }
        }
      }
    });

    return orders;
  })
});
