import clsxm from '../../utils/clsxm';
import { RoundedBox } from '../box/RoundedBox';

export const ListItemSkeleton = ({ className }: { className?: string }) => {
  return (
    <RoundedBox
      className={clsxm(
        'relative flex w-full items-center justify-between border-none',
        'h-[5.833rem] animate-pulse overflow-hidden bg-primaryBlack/50',
        className
      )}
    />
  );
};
