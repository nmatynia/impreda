import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import clsxm from '../../../../utils/clsxm';
import { Box, BoxProps } from '../../../box/Box';
import { SvgIcon } from '../../../icons/SvgIcon';
import { BodyText } from '../../../typography/Typography';
type AccountMenuProps = {
  className?: string;
} & BoxProps;

export const AccountMenu = ({ className, ...props }: AccountMenuProps) => {
  const { data: session } = useSession();
  return (
    <Box className={clsxm('absolute', className)} {...props}>
      <ItemWrappper>
        <Link
          href={!session ? '/account' : '/login'}
          className="flex items-center justify-center gap-4"
        >
          <SvgIcon name="OutlinedPerson" />
          <BodyText>{!session ? 'Login' : 'Account'}</BodyText>
        </Link>
      </ItemWrappper>
      <ItemWrappper>
        <Link href={'/'} className="flex items-center justify-center gap-4">
          <SvgIcon name="OutlinedSettings" />
          <BodyText>Preferences</BodyText>
        </Link>
      </ItemWrappper>
      {session && (
        <ItemWrappper>
          <button className="flex items-center justify-center gap-4" onClick={() => signOut()}>
            <SvgIcon name="Logout" />
            <BodyText>Logout</BodyText>
          </button>
        </ItemWrappper>
      )}
    </Box>
  );
};

const ItemWrappper = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={clsxm(
        'flex cursor-pointer select-none items-center gap-4 border-b-[1px]',
        'border-primaryBlack py-4 first:pt-0 last:border-0 last:pb-0'
      )}
    >
      {children}
    </div>
  );
};
