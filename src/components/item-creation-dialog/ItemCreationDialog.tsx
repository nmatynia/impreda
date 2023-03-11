import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../button/Button';
import { Form } from '../forms/Form';
import { InputField } from '../forms/InputField';
import { SelectField } from '../forms/SelectField';
import { BodyText } from '../typography/Typography';
type ItemCreationDialogProps = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
export const ItemDetailsSchema = z.object({
  name: z.string(),
  brand: z.string(),
  size: z.any()
  // object({ id: z.string(), name: z.string() })
});

type ItemDetailsType = z.infer<typeof ItemDetailsSchema>;

const sizeOptions = [
  { name: 'XS', id: 'XS' },
  { name: 'S', id: 'S' },
  { name: 'M', id: 'M' },
  { name: 'L', id: 'L' },
  { name: 'XL', id: 'XL' },
  { name: 'XXL', id: 'XXL' }
];

export const ItemCreationDialog = ({ isOpen, handleCloseDialog }: ItemCreationDialogProps) => {
  const methods = useForm<ItemDetailsType>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      size: sizeOptions[0],
      name: undefined,
      brand: undefined
    }
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit: SubmitHandler<ItemDetailsType> = async (data, e) => {
    handleCloseDialog();
    e?.preventDefault();
    console.log(data);
    // await updateUser(data);
    // handleDisableEditing();
  };

  return (
    //isOpen
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Add a new item
                </Dialog.Title>
                <Form onSubmit={handleSubmit(onSubmit)} {...methods}>
                  <div className="mt-7 flex flex-col gap-8">
                    <div className="flex w-full flex-col gap-6 md:flex-row">
                      <div className="w-1/2">
                        <BodyText>Brand:</BodyText>
                        <InputField
                          placeholder={"Enter item's brand"}
                          name="brand"
                          className="w-full"
                        />
                      </div>
                      <div className="w-1/2">
                        <BodyText>Name:</BodyText>
                        <InputField
                          placeholder={"Enter item's name"}
                          name="name"
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-6 md:flex-row">
                      <SelectField
                        name="size"
                        label="Size"
                        className="w-full"
                        options={sizeOptions}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-row-reverse justify-start gap-3">
                    <Button type="submit">Add item</Button>
                    <Button variant="outlined" onClick={handleCloseDialog}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
