import React from 'react';
import RoundedBox from '../box/RoundedBox';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText, Bold, LargeBodyText } from '../typography/Typography';

const UserAccountBox = () => {
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
              <Bold>Norbert Matynia</Bold>
            </BodyText>
          </div>
          <div>
            <BodyText>Address:</BodyText>
            <BodyText>
              <Bold>Ullswater 11</Bold>
            </BodyText>
          </div>
          <div>
            <BodyText>City:</BodyText>
            <BodyText>
              <Bold>Leicester</Bold>
            </BodyText>
          </div>
          <div>
            <BodyText>Zip-code:</BodyText>
            <BodyText>
              <Bold>XX-XXX</Bold>
            </BodyText>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div>
            <BodyText>Card Details:</BodyText>
            <BodyText>
              <Bold>1234 5678 9012 4210</Bold>
            </BodyText>
          </div>
          <div>
            <BodyText>Phone number:</BodyText>
            <BodyText>
              <Bold>734 241 411</Bold>
            </BodyText>
          </div>
        </div>
      </div>
      {/* <div className="w-full border-b-[1px] border-primaryBlack" /> */}
    </RoundedBox>
  );
};

export default UserAccountBox;
