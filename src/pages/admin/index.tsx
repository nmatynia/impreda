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

  const uploadImage = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const filename = encodeURIComponent(file?.name ?? '');
    const { url, fields }: { url: string; fields: any } = (await createPresignedUrl()) as any;
    console.log(url);
    const data = {
      ...fields,
      'Content-Type': file.type,
      file
    };
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    await fetch(url, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };
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
      <input
        className="hidden"
        ref={fileRef}
        onChange={uploadImage}
        type="file"
        accept="image/png, image/jpeg"
        name="image"
      />
    </Container>
  );
};

export default admin;
