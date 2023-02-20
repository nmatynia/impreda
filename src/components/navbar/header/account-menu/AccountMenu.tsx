import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import clsxm from '../../../../utils/clsxm';
import Box, { BoxProps } from '../../../box/Box';
import { IconName, SvgIcon } from '../../../icons/SvgIcon';
import { BodyText } from '../../../typography/Typography';
type AccountMenuProps = {
  className?: string;
} & BoxProps;

type MenuItemProps = {
  icon: IconName;
  text: string;
  path?: string;
  onClick?: () => void;
};

const menuItems: MenuItemProps[] = [
  {
    icon: 'OutlinedPerson',
    text: 'Account',
    path: '/account'
  },
  {
    icon: 'OutlinedSettings',
    text: 'Preferences'
  },
  {
    icon: 'Logout',
    text: 'Logout',
    onClick: () => signOut()
  }
];
const AccountMenu = ({ className, ...props }: AccountMenuProps) => {
  return (
    <Box className={clsxm('absolute', className)} {...props}>
      {menuItems.map(item => (
        <div className="flex cursor-pointer select-none items-center gap-4 border-b-[1px] border-primaryBlack py-4 first:pt-0 last:border-0 last:pb-0">
          {item.onClick ? (
            <button className="flex items-center justify-center gap-4" onClick={item.onClick}>
              <SvgIcon name={item.icon} />
              <BodyText>{item.text}</BodyText>
            </button>
          ) : (
            <Link href={item.path || '/'} className="flex items-center justify-center gap-4">
              <SvgIcon name={item.icon} />
              <BodyText>{item.text}</BodyText>
            </Link>
          )}
        </div>
      ))}
    </Box>
  );
};

export default AccountMenu;
