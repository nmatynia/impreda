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
    const orderItemParams = {
      cartId,
      colorId,
      sizeId,
      itemId
    };

    const orderItem = await ctx.prisma.orderItem.findFirst({
      where: orderItemParams
    });

    if (orderItem) {
      await ctx.prisma.orderItem.update({
        where: {
          id: orderItem.id
        },
        data: {
          quantity: {
            increment: 1
          }
        }
      });
    } else {
      await ctx.prisma.orderItem.create({
        data: orderItemParams
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
    .mutation(async ({ ctx, input: { orderItemId } }) => {
      // TODO: unreserve the item?
      const cart = await ctx.prisma.cart.findUnique({
        where: {
          userId: ctx?.session?.user?.id
        },
        select: {
          id: true,
          _count: {
            select: {
              items: true
            }
          }
        }
      });
      console.log('\n\n', cart?._count.items);
      const orderItem = await ctx.prisma.orderItem.findUnique({
        where: {
          id: orderItemId
        }
      });

      if (!orderItem) {
        throw new TRPCError({
          code: 'BAD_REQUEST'
        });
      }

      if (orderItem.cartId !== cart?.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You do not have permission to remove this item from the cart'
        });
      }

      if (orderItem?.quantity > 1) {
        await ctx.prisma.orderItem.update({
          where: {
            id: orderItemId
          },
          data: {
            quantity: {
              decrement: 1
            }
          }
        });
        return true;
      }

      if (cart?._count.items === 1) {
        await ctx.prisma.cart.delete({
          where: {
            id: cart.id
          }
        });
        return true;
      }

      await ctx.prisma.orderItem.delete({
        where: {
          id: orderItemId
        }
      });

      return true;
    }),
  removeCart: protectedProcedure.mutation(async ({ ctx }) => {
    // TODO: unreserve the item?
    const cart = await ctx.prisma.cart.findUnique({
      where: {
        userId: ctx?.session?.user?.id
      }
    });

    if (!cart) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No cart found'
      });
    }

    await ctx.prisma.cart.delete({
      where: {
        id: cart.id
      }
    });

    return true;
  })
});
