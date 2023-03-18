import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ItemDetailsType, ItemInfoForm } from './forms/ItemInfoForm';
import { OptionType } from '../select/Select';
import { DialogModal } from '../dialog/DialogModal';
import { FormTransitionWrapper } from '../forms/FormTransitionWrapper';
import { ItemAvailabilityForm, ItemAvailabilityType } from './forms/ItemAvailabilityForm';

type ItemCreationDialogProps = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

export const ItemCreationDialog = ({ isOpen, handleCloseDialog }: ItemCreationDialogProps) => {
  const [step, setStep] = React.useState<number>(1);
  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const brand = React.useRef<string>();
  const name = React.useRef<string>();
  const price = React.useRef<number>();
  const sex = React.useRef<string>();
  const sizes = React.useRef<OptionType[]>();
  const colors = React.useRef<OptionType[]>();
  const fabrics = React.useRef<OptionType[]>();

  const handleSubmitItemInfoForm: SubmitHandler<ItemDetailsType> = async (data, e) => {
    e?.preventDefault();
    brand.current = data.brand;
    name.current = data.name;
    price.current = Number(data.price);
    sex.current = data.sex.key;
    sizes.current = data.sizes;
    colors.current = data.colors;
    fabrics.current = data.fabrics;
    handleNextStep();
  };

  const handleSubmitItemAvailabilityForm: SubmitHandler<ItemAvailabilityType> = async (data, e) => {
    e?.preventDefault();
    console.log(data);
  };
  console.log(colors.current);
  return (
    <DialogModal title="Add a new item" isOpen={isOpen} handleCloseDialog={handleCloseDialog}>
      <FormTransitionWrapper show={step === 1}>
        <ItemInfoForm handleCloseDialog={handleCloseDialog} onSubmit={handleSubmitItemInfoForm} />
      </FormTransitionWrapper>
      <FormTransitionWrapper show={step === 2}>
        {sizes.current && colors.current && (
          <ItemAvailabilityForm
            sizes={sizes.current as OptionType<ItemAvailabilityType['colors'][0]['sizes']>}
            colors={colors.current as OptionType<ItemAvailabilityType['colors']>}
            handleCloseDialog={handleCloseDialog}
            handlePreviousStep={handlePreviousStep}
            onSubmit={handleSubmitItemAvailabilityForm}
          />
        )}
      </FormTransitionWrapper>
    </DialogModal>
  );
};
