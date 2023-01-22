import React from 'react';
import clsxm from '../../../../utils/clsxm';
import Box, { BoxProps } from '../../../box/Box';
import { SvgIcon } from '../../../icons/SvgIcon';
import { BodyText } from '../../../typography/Typography';
type AccountMenuProps = {
  className?: string;
} & BoxProps;
const menuItems = [
  {
    icon: <SvgIcon name="OutlinedPerson" />,
    text: 'Account'
  },
  {
    icon: <SvgIcon name="OutlinedSettings" />,
    text: 'Preferences'
  },
  {
    icon: <SvgIcon name="Logout" />,
    text: 'Logout'
  }
];
const AccountMenu = ({ className, ...props }: AccountMenuProps) => {
  return (
    <Box className={clsxm('absolute', className)} {...props}>
      {menuItems.map(item => (
        <div className="flex cursor-pointer select-none items-center gap-4 border-b-[1px] border-primaryBlack py-4 first:pt-0 last:border-0 last:pb-0">
          {item.icon}
          <BodyText>{item.text}</BodyText>
        </div>
      ))}
    </Box>
  );
};

export default AccountMenu;
