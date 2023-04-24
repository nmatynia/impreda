import { ListItemSkeleton } from './ListItemSkeleton';

export const ListSkeleton = () => (
  <div className="z-10 my-6 flex h-[29rem] flex-col gap-6">
    <ListItemSkeleton />
    <ListItemSkeleton />
    <ListItemSkeleton />
    <ListItemSkeleton />
  </div>
);
