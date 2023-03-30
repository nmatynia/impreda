import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '../../components/container/Container';
import { ItemListSection } from '../../components/item-list-section/ItemListSection';
import { OrderHistorySection } from '../../components/order-history-section/OrderHistorySection';
import { UserListSection } from '../../components/user-list-section/UserListSection';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';

const AdminPage = () => {
  return (
    <Container className="w-full">
      <div className="item-center flex w-full flex-col justify-center gap-8 lg:max-w-full lg:flex-row">
        <ItemListSection className="w-full lg:w-1/2" />
        <OrderHistorySection className="w-full lg:w-1/2" />
      </div>
      <UserListSection className="w-full" />
    </Container>
  );
};

export default AdminPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);

  if (session?.user?.role !== 'ADMIN') {
    return { redirect: { destination: '/' }, props: {} };
  }

  return {
    props: {}
  };
};
