import React, { useRef } from 'react';
import { Container } from '../../components/container/Container';
import { SvgIcon } from '../../components/icons/SvgIcon';
import { ItemCreationDialog } from '../../components/item-creation-dialog/ItemCreationDialog';
import { ItemListSection } from '../../components/item-list-section/ItemListSection';
import { OrderHistorySection } from '../../components/order-history-section/OrderHistorySection';
import { trpc } from '../../utils/trpc';

const admin = () => {
  const utils = trpc.useContext();

  const { mutateAsync: createPresignedUrl } = trpc.images.createPresignedUrl.useMutation({
    onSuccess: () => {
      utils.images.invalidate();
    }
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const [isItemCreationOpen, setIsItemCreationOpen] = React.useState(false);
  return (
    <Container className="w-full">
      <div className="item-center flex w-full flex-col justify-center gap-8 md:max-w-xl lg:max-w-full lg:flex-row">
        <button onClick={() => setIsItemCreationOpen(true)}>
          <SvgIcon name="Add" className="cursor-pointer" />
        </button>
        <ItemCreationDialog
          isOpen={isItemCreationOpen}
          handleCloseDialog={() => setIsItemCreationOpen(false)}
        />
        <OrderHistorySection />
        <ItemListSection />
      </div>
    </Container>
  );
};

export default admin;
