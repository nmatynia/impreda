import aws from 'aws-sdk'
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { UserDetailsSchema } from '../../../components/user-account-box/UserAcountBox';

import { router, publicProcedure } from '../trpc';

const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.APP_AWS_SECRET_KEY,
  region: process.env.APP_AWS_REGION,
  signatureVersion: 'v4',
})

export const imagesRouter = router({
  createPresignedUrl: publicProcedure.mutation(async ({ ctx, input }) => {
    //TODO: make this only available for admin
    // const { session } = ctx;
    // const userId = session?.user?.id;
    // if (!userId) {
    //   return;
    // }

    //TODO: change randomUUID on the left to item name
    const key = `${randomUUID()}/${randomUUID()}`;

    return await s3.createPresignedPost({
      Fields: {
        key
      },
      Expires: 60,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Conditions: [
        ['starts-with', "$Content-Type", "image/"],
        ['content-length-range', 0, 5048576], // up to 1 MB
      ],
    })
  }),
});
