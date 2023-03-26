import { TRPCError } from '@trpc/server';
import aws from 'aws-sdk';
import { z } from 'zod';

import { router, publicProcedure } from '../trpc';

const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.APP_AWS_SECRET_KEY,
  region: process.env.APP_AWS_REGION,
  signatureVersion: 'v4'
});

export const imagesRouter = router({
  createPresignedUrl: publicProcedure
    .input(z.object({ itemId: z.string(), filename: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { session } = ctx;
      const userId = session?.user?.id;
      if (!userId) {
        throw new TRPCError({ message: 'Unauthanticated', code: 'UNAUTHORIZED' });
      }

      const userInfo = await ctx.prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          role: true
        }
      });

      if (userInfo && userInfo.role !== 'ADMIN') {
        throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
      }

      const { itemId } = input;
      const image = await ctx.prisma.image.create({
        data: {
          itemId,
          filename: input.filename
        }
      });
      const key = `${itemId}/${image.id}`;
      const presignedPost = await s3.createPresignedPost({
        Fields: {
          key
        },
        Expires: 60,
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Conditions: [
          ['starts-with', '$Content-Type', 'image/'],
          ['content-length-range', 0, 5048576] // up to 1 MB
        ]
      });

      await ctx.prisma.image.update({
        where: {
          id: image.id
        },
        data: {
          url: `${presignedPost.url}/${key}`
        }
      });

      return presignedPost;
    })
});
