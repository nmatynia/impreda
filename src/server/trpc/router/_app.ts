import { router } from '../trpc';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { imagesRouter } from './images';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  images: imagesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
