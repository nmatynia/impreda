import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ItemDetailsType, ItemInfoForm } from './forms/ItemInfoForm';
import { OptionType } from '../select/Select';
import { DialogModal } from '../dialog/DialogModal';
import { FormTransitionWrapper } from '../forms/FormTransitionWrapper';
import { Input } from '../input/Input';
type ItemCreationDialogProps = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

export const ItemCreationDialog = ({ isOpen, handleCloseDialog }: ItemCreationDialogProps) => {
  const [showItemInfoForm, setShowItemInfoForm] = React.useState<boolean>(true);
  const handleHideItemInfoForm = () => setShowItemInfoForm(false);
  const [showItemAvailabilityForm, setShowItemAvailabilityForm] = React.useState<boolean>(false);
  const handleHideItemAvailabilityForm = () => setShowItemAvailabilityForm(false);
  const handleShowItemAvailabilityForm = () => setShowItemAvailabilityForm(true);
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
    handleHideItemInfoForm();
    handleShowItemAvailabilityForm();
  };

  return (
    <DialogModal title="Add a new item" isOpen={isOpen} handleCloseDialog={handleCloseDialog}>
      <FormTransitionWrapper show={showItemInfoForm}>
        <ItemInfoForm handleCloseDialog={handleCloseDialog} onSubmit={handleSubmitItemInfoForm} />
      </FormTransitionWrapper>
      <FormTransitionWrapper show={showItemAvailabilityForm}>
        <Input label="Brand:" placeholder={"Enter item's brand"} name="brand" className="w-1/2" />
        <Input label="Name:" placeholder={"Enter item's name"} name="name" className="w-1/2" />
      </FormTransitionWrapper>
    </DialogModal>
  );
};
