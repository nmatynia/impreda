import { router } from '../trpc';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  auth: authRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
