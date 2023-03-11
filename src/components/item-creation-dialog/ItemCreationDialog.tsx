import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Form from '../forms/Form';
import InputField from '../forms/InputField';
import { Select } from '../select/Select';
import { BodyText } from '../typography/Typography';
type ItemCreationDialogProps = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
export const ItemDetailsSchema = z.object({
  name: z.string().min(1).max(50).nullish()
  // address: z.string().min(3).max(50).nullish(),
  // city: z.string().min(3).max(50).nullish(),
  // zipCode: z.string().min(1).max(50).nullish(),
  // cardNumber: z.string().min(16).max(19).nullish(),
  // phoneNumber: z.string().min(9).max(10).nullish()
});

type ItemDetailsType = z.infer<typeof ItemDetailsSchema>;

export const ItemCreationDialog = ({ isOpen, handleCloseDialog }: ItemCreationDialogProps) => {
  const methods = useForm<ItemDetailsType>({
    resolver: zodResolver(ItemDetailsSchema)
    // defaultValues: {
    //   name: data?.name,
    //   address: data?.address,
    //   city: data?.city,
    //   zipCode: data?.zipCode,
    //   cardNumber: data?.cardNumber,
    //   phoneNumber: data?.phoneNumber
    // }
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit: SubmitHandler<ItemDetailsType> = async (data, e) => {
    e?.preventDefault();
    // await updateUser(data);
    // handleDisableEditing();
  };
  return (
    //isOpen
    <Transition appear show={true} as={Fragment}>
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
                  <div className="mt-7 flex flex-col">
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
                      <Select className="w-full" />
                    </div>
                  </div>
                </Form>
                {/* <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you an email with all
                    of the details of your order.
                  </p>
                </div> */}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleCloseDialog}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
