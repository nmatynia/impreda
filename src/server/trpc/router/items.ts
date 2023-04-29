import aws from 'aws-sdk';
import { z } from 'zod';

import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { router, publicProcedure, adminProcedure } from '../trpc';
import {
  CreateItemSchema,
  GetItemsSchema,
  SexSchema,
  UpdateItemSchema
} from '../../../utils/validation';
import { Context } from '../context';

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
    const existingSizesNames = existingColors.flatMap(color => color.sizes.map(size => size.name));
    const usedSizesNames = input.colors.flatMap(color => color.sizes.map(size => size.name));

    type Color = z.infer<typeof UpdateItemSchema>['colors'][0];
    type Size = Color['sizes'][0];

    const processColor = async (color: Color) => {
      const colorId = existingColors[existingColorsNames.indexOf(color.name)]?.id;
      let colorAvailibility = 0;
      const sizesIds: { id: string }[] = [];

      const processSize = async (size: Size) => {
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
      };

      await Promise.all(color.sizes.map(processSize));

      if (colorId) {
        await ctx.prisma.color.update({
          where: {
            id: colorId
          },
          data: {
            available: colorAvailibility,
            sizes: {
              connect: sizesIds
            }
          }
        });
      } else {
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
                id: input.id
              }
            }
          }
        });
      }

      return colorId;
    };

    const deleteUnusedColors = async (usedColorIds: string[]) => {
      const unusedColorIds = existingColors
        .filter(existingColor => !usedColorIds.includes(existingColor.id))
        .map(unusedColor => unusedColor.id);

      const unusedColorsWithSizes = await ctx.prisma.color.findMany({
        where: { id: { in: unusedColorIds } },
        include: { sizes: true }
      });

      const sizeIdsToDelete = unusedColorsWithSizes.flatMap(color =>
        color.sizes.map(size => size.id)
      );

      // Delete sizes connected to the unused colors
      await ctx.prisma.size.deleteMany({ where: { id: { in: sizeIdsToDelete } } });

      // Delete unused colors
      await ctx.prisma.color.deleteMany({ where: { id: { in: unusedColorIds } } });
    };

    const usedColorIds = (await Promise.all(input.colors.map(processColor))).filter(
      (colorId): colorId is string => colorId !== undefined
    );
    await deleteUnusedColors(usedColorIds);

    await Promise.all(
      existingSizesNames
        .filter(sizeName => !usedSizesNames.includes(sizeName))
        .map(filteredSizeName => ctx.prisma.size.deleteMany({ where: { name: filteredSizeName } }))
    );

    return {
      itemId: input.id
    };
  }),
  getListItems: publicProcedure.query(async ({ ctx }) => {
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
    const { sexNames, sizeNames, categoryNames, colorNames, sortBy, fabricNames } = input ?? {};

    const orderByFn = () => {
      switch (sortBy) {
        case 'newest':
          return { createdAt: Prisma.SortOrder.desc };
        case 'oldest':
          return { createdAt: Prisma.SortOrder.asc };
        case 'priceAsc':
          return { price: Prisma.SortOrder.asc };
        case 'priceDesc':
          return { price: Prisma.SortOrder.desc };
        case 'popularity':
          return { views: Prisma.SortOrder.desc };
        default:
          return { createdAt: Prisma.SortOrder.desc };
      }
    };
    const orderBy = orderByFn();
    const parsedSexNames = z.array(SexSchema).safeParse(sexNames).success
      ? (sexNames as z.infer<typeof SexSchema>[])
      : undefined;
    const items = await ctx.prisma.item.findMany({
      where: {
        sex: {
          in: parsedSexNames
        },
        sizes: {
          some: {
            name: {
              in: sizeNames
            }
          }
        },
        colors: {
          some: {
            name: {
              in: colorNames
            }
          }
        },
        fabrics: {
          in: fabricNames
        }
        // category: {
        //   some: {
        //     name: categoryNames
        //   }
        // },
      },
      select: {
        id: true,
        brand: true,
        name: true,
        sizes: true,
        colors: true,
        price: true,
        images: true
      },
      orderBy
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
  }),
  getItemsByName: publicProcedure
    .input(z.string().or(z.undefined()))
    .query(async ({ ctx, input: searchText }) => {
      const items = await ctx.prisma.item.findMany({
        where: {
          OR: [
            {
              name: {
                contains: searchText
              }
            },
            {
              brand: {
                contains: searchText
              }
            }
          ]
        },
        take: 5,
        select: {
          id: true,
          brand: true,
          name: true,
          price: true,
          images: true
        }
      });
      return items;
    }),
  incrementItemViewCount: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: itemId }) => {
      await ctx.prisma.item.update({
        where: {
          id: itemId
        },
        data: {
          views: {
            increment: 1
          }
        }
      });
    })
});
