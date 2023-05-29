import { router, adminProcedure, protectedProcedure } from '../trpc';

export const orderRouter = router({
  createOrder: protectedProcedure.mutation(async ({ ctx }) => {
    const cart = await ctx.prisma.cart.findUnique({
      where: {
        userId: ctx.session.user.id
      },
      include: {
        items: true
      }
    });

    if (!cart) throw new Error('Cart is empty');

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id
      }
    });

    if (!user) throw new Error('User not found');

    const uniqueOrderItems = cart.items
      .map(item => item.id)
      .filter((value, index, array) => array.indexOf(value) === index)
      .map(id => ({ id }));

    // TODO: add address, city, zipCode here, make proper validation in checkout
    await ctx.prisma.order.create({
      data: {
        user: {
          connect: {
            id: ctx.session.user.id
          }
        },
        address: user.address ?? 'hardcoded address',
        city: user.city ?? 'hardcoded city',
        zipCode: user.zipCode ?? 'hardcoded zipCode',
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
        },
        user: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return orders.map(order => ({
      ...order,
      items: order.items.flatMap(orderItem =>
        Array.from({ length: orderItem.quantity }, () => orderItem)
      )
    }));
  })
});
