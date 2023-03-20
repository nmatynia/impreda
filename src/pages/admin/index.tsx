import Link from 'next/link';
import React from 'react';
import { Container } from '../../components/container/Container';
import { SvgIcon } from '../../components/icons/SvgIcon';
import { ItemListSection } from '../../components/item-list-section/ItemListSection';
import { OrderHistorySection } from '../../components/order-history-section/OrderHistorySection';

const AdminPage = () => {
  return (
    <Container className="w-full">
      <div className="item-center flex w-full flex-col justify-center gap-8 md:max-w-xl lg:max-w-full lg:flex-row">
        <Link href="/admin/item-creator">
          <SvgIcon name="Add" className="cursor-pointer" />
        </Link>
        <OrderHistorySection />
        <ItemListSection />
      </div>
    </Container>
  );
};

export default AdminPage;
