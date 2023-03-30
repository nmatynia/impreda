import clsxm from '../../utils/clsxm';
import { RoundedBox } from '../box/RoundedBox';
import { Loader } from '../loader/Loader';

export const ListItemSkeleton = ({ className }: { className?: string }) => {
  return (
    <RoundedBox
      className={clsxm(
        'relative flex w-full items-center justify-between',
        'h-[5.833rem] overflow-hidden bg-primaryWhite py-5 text-primaryBlack',
        className
      )}
    >
      <Loader className={clsxm('h-4 w-4')} />
    </RoundedBox>
  );
};
