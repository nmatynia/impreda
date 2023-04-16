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
    console.log(
      '\n\n',
      cart.items
      // cart.items.map(item => ({ id: item.id }))
    );

    // const itemsIds = new Set();
    // cart.items.forEach(item => itemsIds.add({ id: item.itemId }));

    const uniqueOrderItems = cart.items
      .map(item => item.id)
      .filter((value, index, array) => array.indexOf(value) === index)
      .map(id => ({ id }));

    console.log('\n\n', uniqueOrderItems);

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
  })
});
