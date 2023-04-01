import { Dialog, Transition } from '@headlessui/react';
import type { ReactNode } from 'react';
import React, { Fragment } from 'react';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';
import { RoundedBox } from '../box/RoundedBox';
import { LargeBodyText } from '../typography/Typography';

type DialogModalProps = {
  title: string;
  actionElement?: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  handleCloseDialog: () => void;
  className?: string;
};

export const DialogModal = ({
  title,
  children,
  actionElement,
  isOpen,
  handleCloseDialog,
  className
}: DialogModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={clsxm('relative z-10')} onClose={handleCloseDialog}>
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
              <Dialog.Panel>
                <RoundedBox className={clsxm('mt-16 w-full p-0 text-left shadow-xl', className)}>
                  <Dialog.Title
                    as="h3"
                    className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8"
                  >
                    <div className="flex gap-5">
                      <LargeBodyText>{title}</LargeBodyText>
                      {actionElement}
                    </div>
                    <button type="button" className="cursor-pointer" onClick={handleCloseDialog}>
                      <SvgIcon name="Cross" className=" text-primaryBlack" />
                    </button>
                  </Dialog.Title>
                  {children}
                </RoundedBox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
