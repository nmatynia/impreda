import React from 'react';
import clsxm from '../../utils/clsxm';
import { RoundedBox } from '../box/RoundedBox';
import { ButtonSwitch } from '../button-switch/ButtonSwitch';
import { FilterMenu } from '../filter-menu/FilterMenu';
import { SvgIcon } from '../icons/SvgIcon';
import { LargeBodyText } from '../typography/Typography';

type UserListFilterPanelProps = {
  sectionName?: string;
  className?: string;
};
export const UserListFilterPanel = ({
  sectionName = 'Filters',
  className
}: UserListFilterPanelProps) => {
  return (
    <RoundedBox
      className={clsxm(
        'mt-16 flex w-full items-center justify-between overflow-visible',
        className
      )}
    >
      <LargeBodyText>{sectionName}</LargeBodyText>
      <div className="relative flex cursor-pointer gap-3">
        <ButtonSwitch
          elementToOpen={open => <FilterMenu className="absolute top-9 right-1/2" isOpen={open} />}
        >
          <SvgIcon name="Filter" className="fill-primaryBlack" />
        </ButtonSwitch>
      </div>
    </RoundedBox>
  );
};
