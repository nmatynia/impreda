import aws from 'aws-sdk';
import { z } from 'zod';

import { TRPCError } from '@trpc/server';
import { router, publicProcedure, adminProcedure } from '../trpc';
import { CreateItemSchema, GetItemsSchema, UpdateItemSchema } from '../../../utils/validation';
import { Context } from '../context';

// You will need other logic for updates cause the colors are doubled now since the old ones are not updated/deleted but a new one is created.
const createSizeAndColor = async (
  ctx: Context,
  colors: z.infer<typeof CreateItemSchema>['colors'],
  itemId: string
) => {
  // TODO: Perhaphs listen to the ESlint rule and refactor this code
  // eslint-disable-next-line no-restricted-syntax
  for (const color of colors) {
    let colorAvailibility = 0;
    const sizesIds: { id: string }[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const size of color.sizes) {
      // eslint-disable-next-line no-await-in-loop
      const { id: sizeId } = await ctx.prisma.size.create({
        data: {
          name: size.name,
          available: Number(size.available),
          items: {
            connect: {
              id: itemId
            }
          }
        }
      });
      colorAvailibility += Number(size.available);
      sizesIds.push({ id: sizeId });
    }

    // eslint-disable-next-line no-await-in-loop
    await ctx.prisma.color.create({
      data: {
        name: color.name,
        available: colorAvailibility,
        hex: color.hex,
        sizes: {
          connect: sizesIds
        },
        items: {
          connect: {
            id: itemId
          }
        }
      }
    });
  }
};

export const itemsRouter = router({
  createItem: adminProcedure.input(CreateItemSchema).mutation(async ({ ctx, input }) => {
    const item = await ctx.prisma.item.create({
      data: {
        name: input.name,
        brand: input.brand,
        sex: input.sex,
        price: input.price,
        description: input.description,
        fabrics: input.fabrics,
        category: {
          connect: {
            id: input.category
          }
        }
      }
    });

    await createSizeAndColor(ctx, input.colors, item.id);
    return {
      itemId: item.id
    };
  }),
  updateItem: adminProcedure.input(UpdateItemSchema).mutation(async ({ ctx, input }) => {
    const itemId = input.id;
    await ctx.prisma.item.update({
      where: {
        id: itemId
      },
      data: {
        name: input.name,
        brand: input.brand,
        sex: input.sex,
        price: input.price,
        description: input.description,
        fabrics: input.fabrics,
        category: {
          connect: {
            id: input.category
          }
        }
      }
    });

    const existingColors = await ctx.prisma.color.findMany({
      where: {
        items: {
          id: itemId
        }
      },
      include: {
        sizes: true
      }
    });

    const existingColorsNames = existingColors.map(color => color.name);

    const colorAndSizePromises = input.colors.map(async color => {
      const colorId = existingColors[existingColorsNames.indexOf(color.name)]?.id;
      let colorAvailibility = 0;
      const sizesIds: { id: string }[] = [];
      if (colorId) {
        const sizesPromises = color.sizes.map(async size => {
          const sizeId = existingColors[existingColorsNames.indexOf(color.name)]?.sizes.find(
            existingSize => existingSize.name === size.name
          )?.id;
          if (sizeId) {
            await ctx.prisma.size.update({
              where: {
                id: sizeId
              },
              data: {
                available: Number(size.available)
              }
            });
            sizesIds.push({ id: sizeId });
          } else {
            const { id: sizeId } = await ctx.prisma.size.create({
              data: {
                name: size.name,
                available: Number(size.available),
                items: {
                  connect: {
                    id: input.id
                  }
                }
              }
            });
            sizesIds.push({ id: sizeId });
          }
          colorAvailibility += Number(size.available);
        });
        const result = [
          ...sizesPromises,
          ctx.prisma.color.update({
            where: {
              id: colorId
            },
            data: {
              available: colorAvailibility,
              sizes: {
                connect: sizesIds
              }
            }
          })
        ];
        Promise.all(result);
      } else {
        const sizesIds: { id: string }[] = [];
        const sizesPromises = color.sizes.map(async size => {
          const { id: sizeId } = await ctx.prisma.size.create({
            data: {
              name: size.name,
              available: Number(size.available),
              items: {
                connect: {
                  id: input.id
                }
              }
            }
          });
          colorAvailibility += Number(size.available);
          sizesIds.push({ id: sizeId });
        });
        const result = [
          ...sizesPromises,
          ctx.prisma.color.create({
            data: {
              name: color.name,
              available: colorAvailibility,
              hex: color.hex,
              sizes: {
                connect: sizesIds
              },
              items: {
                connect: {
                  id: input.id
                }
              }
            }
          })
        ];
        Promise.all(result);
      }
    });
    await Promise.all(colorAndSizePromises);

    // await createSizeAndColor(ctx, input.colors, input.id);
    return {
      itemId: input.id
    };
  }),
  getListItems: publicProcedure.query(async ({ ctx }) => {
    // TODO: Get rid of this hack and user _count
    // TODO enhance that with filters
    const items = await ctx.prisma.item.findMany({
      select: {
        id: true,
        brand: true,
        name: true,
        price: true,
        views: true,
        images: true,
        savedBy: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    return items.map(item => ({
      id: item.id,
      brand: item.brand,
      name: item.name,
      price: item.price,
      savedBy: item.savedBy.length,
      images: item.images,
      views: item.views
    }));
  }),
  getItems: publicProcedure.input(GetItemsSchema).query(async ({ ctx, input }) => {
    const { sex, sizesNames, categoryName, colorsNames } = input ?? {};
    const items = await ctx.prisma.item.findMany({
      where: {
        sex,
        sizes: {
          every: {
            name: {
              in: sizesNames
            }
          }
        },
        category: {
          some: {
            name: categoryName
          }
        },
        colors: {
          every: {
            name: {
              in: colorsNames
            }
          }
        }
      },
      select: {
        id: true,
        brand: true,
        name: true,
        sizes: true,
        colors: true,
        price: true,
        images: true
      }
    });

    return items.map(item => {
      const uniqueSizesNames = [...new Set(item.sizes.map(size => size.name))];

      const sizes = uniqueSizesNames.map(name => ({
        name,
        available: item.sizes
          .filter(size => size.name === name)
          .reduce((acc, curr) => acc + curr.available, 0)
      }));

      return {
        id: item.id,
        brand: item.brand,
        name: item.name,
        sizes,
        colors: item.colors,
        price: item.price,
        images: item.images
      };
    });
  }),

  getItemsIds: publicProcedure.query(async ({ ctx }) => {
    const item = await ctx.prisma.item.findMany({
      select: {
        id: true
      }
    });
    return item;
  }),

  getItem: publicProcedure.input(z.string()).query(async ({ ctx, input: id }) => {
    const item = await ctx.prisma.item.findUnique({
      where: {
        id
      },
      include: {
        sizes: true,
        colors: {
          include: {
            sizes: true
          }
        },
        category: true,
        images: true
      }
    });
    return item;
  }),

  deleteItem: adminProcedure.input(z.string()).mutation(async ({ ctx, input: id }) => {
    const item = await ctx.prisma.item.findUnique({
      where: {
        id
      },
      include: {
        images: true
      }
    });
    if (!item) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Bucket name not found' });
    }

    const s3 = new aws.S3({
      apiVersion: '2006-03-01',
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      region: process.env.APP_AWS_REGION,
      signatureVersion: 'v4'
    });

    await Promise.all(
      item.images.map(image => {
        const nestedObject = image.url?.slice(image.url.indexOf(id));
        if (!nestedObject) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `S3 object was not found: ${image.filename}`
          });
        }
        const params: AWS.S3.DeleteObjectRequest = {
          Bucket: bucketName,
          Key: `${nestedObject}`
        };
        return s3.deleteObject(params).promise();
      })
    ).catch(() => {
      throw new TRPCError({ message: `Error deleting nested object from S3`, code: 'BAD_REQUEST' });
    });

    try {
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: bucketName,
        Key: id
      };
      await s3.deleteObject(params).promise();
    } catch (error) {
      throw new TRPCError({
        message: `Error deleting top-most object from S3`,
        code: 'BAD_REQUEST'
      });
    }

    await ctx.prisma.item.delete({
      where: {
        id
      }
    });

    return true;
  })
});
