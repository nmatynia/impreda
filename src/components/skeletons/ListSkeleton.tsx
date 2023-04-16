import { ListItemSkeleton } from './ListItemSkeleton';

export const ListSkeleton = () => (
  <div className="z-10 my-6 flex flex-col gap-6">
    <ListItemSkeleton />
    <ListItemSkeleton />
    <ListItemSkeleton />
  </div>
);
