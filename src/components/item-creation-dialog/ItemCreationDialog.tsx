import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ItemDetailsType, ItemInfoForm } from './forms/ItemInfoForm';
import { OptionType } from '../select/Select';
import { DialogModal } from '../dialog/DialogModal';
type ItemCreationDialogProps = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

export const ItemCreationDialog = ({ isOpen, handleCloseDialog }: ItemCreationDialogProps) => {
  const brand = React.useRef<string>();
  const name = React.useRef<string>();
  const price = React.useRef<number>();
  const sex = React.useRef<string>();
  const sizes = React.useRef<OptionType[]>();
  const colors = React.useRef<OptionType[]>();
  const fabrics = React.useRef<OptionType[]>();

  const handleSubmitItemInfoForm: SubmitHandler<ItemDetailsType> = async (data, e) => {
    handleCloseDialog();
    e?.preventDefault();
    brand.current = data.brand;
    name.current = data.name;
    price.current = Number(data.price);
    sex.current = data.sex.key;
    sizes.current = data.sizes;
    colors.current = data.colors;
    fabrics.current = data.fabrics;
    console.log(brand.current);
  };

  return (
    <DialogModal title="Add a new item" isOpen={isOpen} handleCloseDialog={handleCloseDialog}>
      <ItemInfoForm handleCloseDialog={handleCloseDialog} onSubmit={handleSubmitItemInfoForm} />
    </DialogModal>
  );
};
