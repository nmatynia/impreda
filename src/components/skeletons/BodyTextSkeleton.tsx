import clsxm from '../../utils/clsxm';

export const BodyTextSkeleton = ({ className }: { className?: string }) => {
  return <div className={clsxm('h-4 w-32 animate-pulse bg-primaryBlack/50', className)} />;
};
