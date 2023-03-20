import type { GetServerSideProps } from 'next';
import React from 'react';
import { OrderHistorySection } from '../components/order-history-section/OrderHistorySection';
import { UserAccountBox } from '../components/user-account-box/UserAcountBox';
import { getServerAuthSession } from '../server/common/get-server-auth-session';

const account = () => {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <UserAccountBox />
      <OrderHistorySection />
    </div>
  );
};

export default account;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: '/login' }, props: {} };
  }

  return {
    props: {}
  };
};
