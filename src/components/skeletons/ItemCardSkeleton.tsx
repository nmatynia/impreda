import clsxm from '../../utils/clsxm';
import { Loader } from '../loader/Loader';

export const ItemCardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={clsxm(
      'relative w-full bg-primaryWhite text-primaryBlack',
      'box-content border-[1px] border-t-0 border-primaryBlack',
      className
    )}
  >
    <Loader className="top-1/2 z-20 h-4 w-4 text-primaryBlack" />
    <div className="aspect-[0.75] w-full opacity-0" />
    <div className="h-24" />
  </div>
);
