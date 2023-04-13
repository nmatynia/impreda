import { TRPCError } from '@trpc/server';
import { AddItemToCartSchema, RemoveItemFromCartSchema } from '../../../utils/validation';
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
  }),
  getCart: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.cart.findUnique({
      where: {
        userId: ctx?.session?.user?.id
      },
      include: {
        items: {
          include: {
            item: {
              include: {
                images: true
              }
            },
            color: true,
            size: true
          }
        }
      }
    });
  }),
  removeFromCart: protectedProcedure
    .input(RemoveItemFromCartSchema)
    .mutation(async ({ ctx, input: { cartItemId } }) => {
      // TODO: unreserve the item?
      const cart = await ctx.prisma.cart.findUnique({
        where: {
          userId: ctx?.session?.user?.id
        }
      });

      const cartItem = await ctx.prisma.cartItem.findUnique({
        where: {
          id: cartItemId
        }
      });

      if (!cartItem) {
        throw new TRPCError({
          code: 'BAD_REQUEST'
        });
      }

      if (cartItem.cartId !== cart?.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You do not have permission to remove this item from the cart'
        });
      }

      if (cartItem?.quantity > 1) {
        await ctx.prisma.cartItem.update({
          where: {
            id: cartItemId
          },
          data: {
            quantity: {
              decrement: 1
            }
          }
        });
        return true;
      }

      await ctx.prisma.cartItem.delete({
        where: {
          id: cartItemId
        }
      });
      return true;
    })
});
