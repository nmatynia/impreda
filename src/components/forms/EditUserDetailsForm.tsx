import React from 'react';
import { User } from '@prisma/client';
import type { UserDetailsType } from '../user-account-box/UserAcountBox';
import { BodyText, Bold } from '../typography/Typography';
import { InputField } from './InputField';
import { Form, FormProps } from './Form';
import { Button } from '../button/Button';
import clsxm from '../../utils/clsxm';
import { formatDate } from '../../utils/helpers/formatDate';

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
  const placeholder = '----';
  return (
    <Form className={clsxm('flex flex-col gap-7 p-8', className)} onSubmit={onSubmit} {...methods}>
      <div className="flex flex-col gap-7 sm:flex-row sm:gap-14">
        {isEditing ? (
          <>
            <div className="flex w-full flex-col gap-7 sm:w-1/2">
              <InputField label="Name:" placeholder="Enter name" name="name" className="w-full" />
              <InputField
                label="Address:"
                placeholder="Enter address"
                name="address"
                className="w-full"
              />
              <InputField label="City:" placeholder="Enter city" name="city" className="w-full" />
              <InputField
                label="Zip Code:"
                placeholder="Enter zip code"
                name="zipCode"
                className="w-full"
              />
            </div>
            <div className="flex w-full flex-col gap-7 sm:w-1/2">
              <InputField
                label="Card Number"
                placeholder="Enter card number"
                name="cardNumber"
                className="w-full"
              />
              <InputField
                label="Phone Number:"
                placeholder="Enter phone number"
                name="phoneNumber"
                className="w-full"
              />
              <div>
                <BodyText>Email:</BodyText>
                <BodyText>
                  <Bold>{user?.email ?? placeholder}</Bold>
                </BodyText>
              </div>
              <div>
                <BodyText>Joined at:</BodyText>
                <BodyText>
                  <Bold>{user?.joinedAt ? formatDate(user.joinedAt) : placeholder}</Bold>
                </BodyText>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full flex-col gap-7 sm:w-1/2">
              <div>
                <BodyText>Name:</BodyText>
                <BodyText>
                  <Bold>{user?.name ?? placeholder}</Bold>
                </BodyText>
              </div>
              <div>
                <BodyText>Address:</BodyText>
                <BodyText>
                  <Bold>{user?.address ?? placeholder}</Bold>
                </BodyText>
              </div>
              <div>
                <BodyText>City:</BodyText>
                <BodyText>
                  <Bold>{user?.city ?? placeholder}</Bold>
                </BodyText>
              </div>
              <div>
                <BodyText>Zip code:</BodyText>
                <BodyText>
                  <Bold>{user?.zipCode ?? placeholder}</Bold>
                </BodyText>
              </div>
            </div>
            <div className="flex w-full flex-col gap-7 sm:w-1/2">
              <div>
                <BodyText>Card Number:</BodyText>
                <BodyText>
                  <Bold>{user?.cardNumber ?? placeholder}</Bold>
                </BodyText>
              </div>
              <div>
                <BodyText>Phone Number:</BodyText>
                <BodyText>
                  <Bold>{user?.phoneNumber ?? placeholder}</Bold>
                </BodyText>
              </div>
              <div>
                <BodyText>Email:</BodyText>
                <BodyText>
                  <Bold>{user?.email ?? placeholder}</Bold>
                </BodyText>
              </div>
              <div>
                <BodyText>Joined at:</BodyText>
                <BodyText>
                  <Bold>{user?.joinedAt ? formatDate(user.joinedAt) : placeholder}</Bold>
                </BodyText>
              </div>
            </div>
          </>
        )}
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
