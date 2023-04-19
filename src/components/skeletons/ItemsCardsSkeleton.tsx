import { ItemCardSkeleton } from './ItemCardSkeleton';

export const ItemsCardsSkeleton = () => (
  <>
    <ItemCardSkeleton />
    <ItemCardSkeleton />
    <ItemCardSkeleton className="hidden md:block" />
    <ItemCardSkeleton className="hidden 2xl:block" />
  </>
);
