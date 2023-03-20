import { Dialog, Transition } from '@headlessui/react';
import type { ReactNode } from 'react';
import React, { Fragment } from 'react';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';

type DialogModalProps = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  handleCloseDialog: () => void;
  className?: string;
};

export const DialogModal = ({
  title,
  children,
  isOpen,
  handleCloseDialog,
  className
}: DialogModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={clsxm('relative z-10', className)} onClose={handleCloseDialog}>
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
                <Dialog.Title
                  as="h3"
                  className="flex justify-between pb-6 text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                  <SvgIcon
                    name="Cross"
                    className="h-4 w-4 cursor-pointer text-primaryBlack"
                    onClick={handleCloseDialog}
                  />
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
