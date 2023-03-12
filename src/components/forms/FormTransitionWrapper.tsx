import { Transition } from '@headlessui/react';
import React, { Fragment, ReactNode } from 'react';

export const FormTransitionWrapper = ({
  children,
  show,
  animateEnter = true,
  animateLeave = true
}: {
  children: ReactNode;
  show: boolean;
  animateEnter?: boolean;
  animateLeave?: boolean;
}) => {
  return (
    <Transition
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom={animateEnter ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      enterTo="opacity-100 translate-x-0"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo={animateLeave ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'}
      show={show}
    >
      <Transition.Child>{children}</Transition.Child>
    </Transition>
  );
};
