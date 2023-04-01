import aws from 'aws-sdk';
import { z } from 'zod';

import { TRPCError } from '@trpc/server';
import { router, publicProcedure, adminProcedure } from '../trpc';

const CreateItemSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  sex: z.enum(['MALE', 'FEMALE', 'UNISEX']),
  description: z.string(),
  fabrics: z.string(),
  category: z.string(),
  colors: z.array(
    z.object({
      name: z.string(),
      hex: z.string(),
      sizes: z.array(
        z.object({
          name: z.enum(['XS', 'S', 'M', 'L', 'XL']),
          available: z.string()
        })
      )
    })
  )
});

const GetItemsSchema = z
  .object({
    sex: z.enum(['MALE', 'FEMALE', 'UNISEX']).optional(),
    colorsNames: z.array(z.string()).optional(),
    sizesNames: z.array(z.enum(['XS', 'S', 'M', 'L', 'XL'])).optional(),
    categoryName: z.string().optional()
    // TODO: Price range, sort by(views, saves , cheapest, most expensive, latest), brand,
  })
  .optional();

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

    // TODO: Perhaphs listen to the ESlint rule and refactor this code
    // eslint-disable-next-line no-restricted-syntax
    for (const color of input.colors) {
      let colorAvailibility = 0;
      const sizesIds = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const size of color.sizes) {
        // eslint-disable-next-line no-await-in-loop
        const { id: sizeId } = await ctx.prisma.size.create({
          data: {
            name: size.name,
            available: Number(size.available),
            items: {
              connect: {
                id: item.id
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
              id: item.id
            }
          }
        }
      });
    }

    return {
      itemId: item.id
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
        colors: true,
        category: true,
        images: true
      }
    });
    return item;
    // const uniqueSizesNames = [...new Set(item.sizes.map(size => size.name))];

    // const sizes = uniqueSizesNames.map(name => ({
    //   name,
    //   available: item.sizes
    //     .filter(size => size.name === name)
    //     .reduce((acc, curr) => acc + curr.available, 0)
    // }));
  }),
  // TODO - test it
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
    const s3objectName = item.images[0]?.url?.split(bucketName)[1]?.split('/')[0];
    if (!s3objectName) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Certificate file key not found' });
    }
    const s3 = new aws.S3({
      apiVersion: '2006-03-01',
      accessKeyId: process.env.APP_AWS_ACCESS_KEY,
      secretAccessKey: process.env.APP_AWS_SECRET_KEY,
      region: process.env.APP_AWS_REGION,
      signatureVersion: 'v4'
    });
    const promiseArray = [];
    try {
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: bucketName,
        Key: s3objectName
      };
      promiseArray.push(s3.deleteObject(params).promise());
    } catch (error) {
      throw new Error(`Error deleting image from S3: ${error}`);
    }

    promiseArray.push(
      ctx.prisma.item.delete({
        where: {
          id
        }
      })
    );
    await Promise.all(promiseArray);
    return true;
  })
});
