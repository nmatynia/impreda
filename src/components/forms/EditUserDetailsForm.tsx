import React from 'react';
import { User } from '@prisma/client';
import type { UserDetailsType } from '../user-account-box/UserAcountBox';
import { BodyText, Bold } from '../typography/Typography';
import { InputField } from './InputField';
import { Form, FormProps } from './Form';
import { Button } from '../button/Button';
import clsxm from '../../utils/clsxm';

type EditUserDetailsFormProps = {
  user: User | null | undefined;
  isEditing: boolean;
  handleDisableEditing: () => void;
} & Omit<FormProps<UserDetailsType>, 'children'>;

export const EditUserDetailsForm = ({
  user,
  isEditing,
  onSubmit,
  handleDisableEditing,
  className,
  ...methods
}: EditUserDetailsFormProps) => {
  return (
    <Form className={clsxm('flex flex-col gap-7 p-8', className)} onSubmit={onSubmit} {...methods}>
      <div className="flex flex-col gap-7 sm:flex-row sm:gap-14">
        <div className="flex w-full flex-col gap-7 sm:w-1/2">
          <div>
            <BodyText>Name:</BodyText>
            {isEditing ? (
              <InputField placeholder="Enter name" name="name" className="w-full" />
            ) : (
              <BodyText>
                <Bold>{user?.name ?? '----'}</Bold>
              </BodyText>
            )}
          </div>
          <div>
            <BodyText>Address:</BodyText>
            {isEditing ? (
              <InputField placeholder="Enter address" name="address" className="w-full" />
            ) : (
              <BodyText>
                <Bold>{user?.address ?? '----'}</Bold>
              </BodyText>
            )}
          </div>
          <div>
            <BodyText>City:</BodyText>
            {isEditing ? (
              <InputField placeholder="Enter city" name="city" className="w-full" />
            ) : (
              <BodyText>
                <Bold>{user?.city ?? '----'}</Bold>
              </BodyText>
            )}
          </div>
          <div>
            <BodyText>Zip code:</BodyText>
            {isEditing ? (
              <InputField placeholder="Enter zip code" name="zipCode" className="w-full" />
            ) : (
              <BodyText>
                <Bold>{user?.zipCode ?? '----'}</Bold>
              </BodyText>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-7 sm:w-1/2">
          <div>
            <BodyText>Card Details:</BodyText>
            {isEditing ? (
              <InputField placeholder="Enter card details" name="cardDetails" className="w-full" />
            ) : (
              <BodyText>
                <Bold>{user?.cardNumber ?? '----'}</Bold>
              </BodyText>
            )}
          </div>
          <div>
            <BodyText>Phone Number:</BodyText>
            {isEditing ? (
              <InputField placeholder="Enter phone number" name="phoneNumber" className="w-full" />
            ) : (
              <BodyText>
                <Bold>{user?.phoneNumber ?? '----'}</Bold>
              </BodyText>
            )}
          </div>
        </div>
      </div>
      {isEditing && (
        // Prevents clicking Cancel button on enter in the form
        <div className="flex flex-row-reverse justify-start gap-3">
          <Button type="submit">Save</Button>
          <Button variant="outlined" onClick={handleDisableEditing}>
            Cancel
          </Button>
        </div>
      )}
    </Form>
  );
};
