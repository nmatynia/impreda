import { AddItemToCartSchema } from '../../../utils/validation';
import { Context } from '../context';
import { router, protectedProcedure } from '../trpc';

export const cartRouter = router({
  addToCart: protectedProcedure.input(AddItemToCartSchema).mutation(async ({ ctx, input }) => {
    const { itemId, colorId, sizeId } = input;

    const findOrCreateCart = async (ctx: Context) => {
      const existingCart = await ctx.prisma.cart.findUnique({
        where: {
          userId: ctx?.session?.user?.id
        }
      });

      if (existingCart) {
        return existingCart;
      }

      return ctx.prisma.cart.create({
        data: {
          user: {
            connect: {
              id: ctx?.session?.user?.id
            }
          }
        }
      });
    };

    const { id: cartId } = await findOrCreateCart(ctx);
    const cartItemParams = {
      cartId,
      colorId,
      sizeId,
      itemId
    };

    const cartItem = await ctx.prisma.cartItem.findFirst({
      where: cartItemParams
    });

    if (cartItem) {
      await ctx.prisma.cartItem.update({
        where: {
          id: cartItem.id
        },
        data: {
          quantity: {
            increment: 1
          }
        }
      });
    } else {
      await ctx.prisma.cartItem.create({
        data: cartItemParams
      });
    }

    return true;
  })
});
