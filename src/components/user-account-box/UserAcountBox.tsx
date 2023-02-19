import React from 'react';
import { trpc } from '../../utils/trpc';
import RoundedBox from '../box/RoundedBox';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText, Bold, LargeBodyText } from '../typography/Typography';

const UserAccountBox = () => {
  const { data } = trpc.user.getCurrent.useQuery();
  console.log(data);
  return (
    <RoundedBox className="mt-16 w-full p-0">
      <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
        <LargeBodyText>User Account</LargeBodyText>
        <button className="cursor-pointer">
          <SvgIcon name="Edit" className="fill-primaryBlack" />
        </button>
      </div>
      <div className="flex flex-col gap-7 p-8 sm:flex-row sm:gap-14">
        <div className="flex flex-col gap-7">
          <div>
            <BodyText>Name:</BodyText>
            <BodyText>
              <Bold>{data?.name ?? '----'}</Bold>
            </BodyText>
          </div>
          <div>
            <BodyText>Address:</BodyText>
            <BodyText>
              <Bold>{data?.address ?? '----'}</Bold>
            </BodyText>
          </div>
          <div>
            <BodyText>City:</BodyText>
            <BodyText>
              <Bold>{data?.city ?? '----'}</Bold>
            </BodyText>
          </div>
          <div>
            <BodyText>Zip-code:</BodyText>
            <BodyText>
              <Bold>{data?.zipCode ?? '----'}</Bold>
            </BodyText>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div>
            <BodyText>Card Details:</BodyText>
            <BodyText>
              <Bold>{data?.cardNumber ?? '----'}</Bold>
            </BodyText>
          </div>
          <div>
            <BodyText>Phone number:</BodyText>
            <BodyText>
              <Bold>{data?.phoneNumber ?? '----'}</Bold>
            </BodyText>
          </div>
        </div>
      </div>
      {/* <div className="w-full border-b-[1px] border-primaryBlack" /> */}
    </RoundedBox>
  );
};

export default UserAccountBox;
