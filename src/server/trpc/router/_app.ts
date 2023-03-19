import { router } from '../trpc';
import { authRouter } from './auth';
import { imagesRouter } from './images';
import { itemsRouter } from './items';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  images: imagesRouter,
  items: itemsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
