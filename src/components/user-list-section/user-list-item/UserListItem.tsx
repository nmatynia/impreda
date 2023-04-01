import React from 'react';
import clsxm from '../../../utils/clsxm';
import { RoundedBox } from '../../box/RoundedBox';
import { SvgIcon } from '../../icons/SvgIcon';
import { BodyText } from '../../typography/Typography';

type UserListItemProps = {
  className?: string;
  name: string;
  joinDate: string;
  totalPurchases: number;
  totalSpent: number;
  handlePreviewUser: () => void;
};
export const UserListItem = ({
  className,
  name,
  joinDate,
  totalPurchases,
  totalSpent,
  handlePreviewUser
}: UserListItemProps) => {
  return (
    <RoundedBox
      className={clsxm(
        'flex w-full items-center justify-between',
        'bg-primaryBlack py-5 text-primaryWhite',
        className
      )}
    >
      <div className="flex w-[calc(100%-48px)] basis-full flex-col gap-3">
        <div className="flex gap-2">
          <BodyText className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
            {name}
          </BodyText>
        </div>
        <div className="flex grid-cols-3 flex-wrap gap-x-4 xs:grid xs:gap-0">
          <BodyText>Joined: {joinDate}</BodyText>
          <BodyText>Purchases: {totalPurchases}</BodyText>
          <BodyText>
            Total spent: <span className="whitespace-pre">{totalSpent}</span>£
          </BodyText>
        </div>
      </div>
      <div className="ml-2 flex basis-6 gap-2">
        <button type="button" className="cursor-pointer" onClick={handlePreviewUser}>
          <SvgIcon name="Eye" className="fill-primaryWhite" />
        </button>
      </div>
    </RoundedBox>
  );
};
