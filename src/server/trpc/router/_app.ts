import { router } from '../trpc';
import { authRouter } from './auth';
import { cartRouter } from './cart';
import { categoriesRouter } from './categories';
import { imagesRouter } from './images';
import { itemsRouter } from './items';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  images: imagesRouter,
  items: itemsRouter,
  categories: categoriesRouter,
  cart: cartRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type ItemsRouter = typeof itemsRouter;
