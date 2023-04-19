import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '../../components/container/Container';
import { ItemListSection } from '../../components/item-list-section/ItemListSection';
import { OrderHistorySection } from '../../components/order-history-section/OrderHistorySection';
import { UserListSection } from '../../components/user-list-section/UserListSection';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { trpc } from '../../utils/trpc';

const AdminPage = () => {
  const { data: orders, isLoading: isOrdersLoading } = trpc.order.getAllOrders.useQuery();
  const { data: items, isLoading: isItemsLoading } = trpc.items.getListItems.useQuery();
  const { data: users, isLoading: isUsersLoading } = trpc.user.getAllUsers.useQuery();

  const isLoading = isOrdersLoading || isItemsLoading || isUsersLoading;

  return (
    <Container className="w-full">
      <div className="item-center flex w-full flex-col justify-center gap-8 lg:max-w-full lg:flex-row">
        <ItemListSection className="w-full lg:w-1/2" items={items} isLoading={isLoading} />
        <OrderHistorySection className="w-full lg:w-1/2" orders={orders} isLoading={isLoading} />
      </div>
      <UserListSection users={users} isLoading={isLoading} className="w-full" />
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
