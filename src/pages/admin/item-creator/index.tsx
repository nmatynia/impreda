import React, { useState, useMemo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { RoundedBox } from '../../../components/box/RoundedBox';
import { LargeBodyText } from '../../../components/typography/Typography';
import type { ItemDetailsType } from '../../../components/forms/ItemInfoForm';
import { ItemInfoForm } from '../../../components/forms/ItemInfoForm';
import type { OptionType } from '../../../components/select/Select';
import type { ItemAvailabilityType } from '../../../components/forms/ItemAvailabilityForm';
import { ItemAvailabilityForm } from '../../../components/forms/ItemAvailabilityForm';
import type { ImageType } from '../../../components/image-uploader/ImageUploader';
import { trpc } from '../../../utils/trpc';
import { SvgIcon } from '../../../components/icons/SvgIcon';
import { Button } from '../../../components/button/Button';
import { LinkButton } from '../../../components/link/LinkButton';
import { getServerAuthSession } from '../../../server/common/get-server-auth-session';
import { SexType } from '../../../types/types';
import clsxm from '../../../utils/clsxm';

const ItemCreator = () => {
  const router = useRouter();
  const { id: itemId } = router.query;
  const isEdit = !!itemId && typeof itemId === 'string';
  const { data: categoryOptions } = trpc.categories.getAllCategories.useQuery();

  const [itemInfoFormDefaultValues, setItemInfoFormDefaultValues] = useState<ItemDetailsType>();
  const [itemAvailabilityFormDefaultValues, setItemAvailabilityFormDefaultValues] =
    useState<ItemAvailabilityType>();
  const { isLoading: isLoadingDetails } = trpc.items.getItem.useQuery(itemId as string, {
    onSuccess: itemData => {
      setItemInfoFormDefaultValues(
        itemData
          ? {
              brand: brand.current ?? itemData.brand,
              name: name.current ?? itemData.name,
              description: description.current ?? itemData.description,
              category: categoryOptions?.find(
                categoryOption =>
                  categoryOption.key === (category.current ?? itemData?.category?.[0]?.id)
              ) as ItemDetailsType['category'],
              sizes:
                sizes.current ??
                [...new Set(itemData.sizes.map(size => size.name))].map(sizeName => ({
                  key: sizeName,
                  name: sizeName
                })),
              colors:
                colors.current ??
                itemData.colors.map(color => ({
                  key: color.name.toLowerCase(),
                  name: color.name,
                  hex: color.hex
                })),
              fabrics: fabrics.current ?? [
                {
                  key: itemData.fabrics,
                  name: itemData.fabrics.slice(0, 1).toUpperCase() + itemData.fabrics.slice(1)
                }
              ], // TODO: redo it to support multiple fabrics
              sex: sex.current ?? {
                name: itemData.sex.slice(0, 1) + itemData.sex.slice(1).toLowerCase(),
                key: itemData.sex
              },
              price: price.current?.toString() ?? itemData.price.toString()
            }
          : undefined
      );
      setItemAvailabilityFormDefaultValues(
        itemData && !colorSizeDirty
          ? {
              colors: itemData.colors.map(color => ({
                key: color.name,
                name: color.name,
                hex: color.hex,
                sizes: color.sizes.map(size => ({
                  key: size.name,
                  name: size.name,
                  available: size.available.toString()
                }))
              }))
            }
          : undefined
      );
    },
    enabled: isEdit
  });

  const [step, setStep] = React.useState<number>(1);
  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);
  const [colorSizeDirty, setColorSizeDirty] = useState<boolean>(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const brand = React.useRef<string>();
  const name = React.useRef<string>();
  const price = React.useRef<number>();
  const description = React.useRef<string>();
  const sex = React.useRef<OptionType<{ key: SexType }>>();
  const sizes = React.useRef<OptionType[]>();
  const colors = React.useRef<OptionType[]>();
  const fabrics = React.useRef<OptionType[]>();
  const category = React.useRef<string>();

  const utils = trpc.useContext();

  const { mutateAsync: createPresignedUrl } = trpc.images.createPresignedUrl.useMutation({
    onSuccess: () => {
      utils.images.invalidate();
    }
  });

  const { mutateAsync: deleteItem, isLoading: isDeleting } = trpc.items.deleteItem.useMutation({
    onSuccess: () => {
      utils.items.invalidate();
    }
  });

  const handleDeleteItem = async () => {
    if (isEdit) {
      await deleteItem(itemId);
      router.push('/admin');
    }
  };
  const { mutateAsync: createItem } = trpc.items.createItem.useMutation();
  const { mutateAsync: updateItem } = trpc.items.updateItem.useMutation();

  const uploadToDB = async (itemId: string) => {
    const requests: Promise<Response>[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const image of images) {
      if (!image.file) return;
      const filename = encodeURIComponent(image.file.name ?? '');
      // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-explicit-any
      const { url, fields }: { url: string; fields: any } = await createPresignedUrl({
        filename,
        itemId
      });

      const data = {
        ...fields,
        'Content-Type': image.file.type,
        file: image.file
      };
      const formData = new FormData();
      // eslint-disable-next-line no-restricted-syntax
      for (const name in data) {
        formData.append(name, data[name]);
      }
      requests.push(
        fetch(url, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        })
      );
    }
    await Promise.all(requests);
  };

  const handleSubmitItemInfoForm: SubmitHandler<ItemDetailsType> = async (data, e) => {
    e?.preventDefault();
    brand.current = data.brand;
    name.current = data.name;
    price.current = Number(data.price);
    sex.current = data.sex;
    sizes.current = data.sizes;
    colors.current = data.colors;
    fabrics.current = data.fabrics;
    description.current = data.description;
    category.current = data.category.key;
    handleNextStep();
  };

  const handleSubmitItemAvailabilityForm: SubmitHandler<ItemAvailabilityType> = async (data, e) => {
    e?.preventDefault();
    if (
      !(
        brand.current &&
        name.current &&
        price.current &&
        sex.current &&
        description.current &&
        fabrics.current &&
        category.current
      )
    ) {
      return;
    }
    if (isEdit) {
      const item = await updateItem({
        id: itemId,
        brand: brand.current,
        name: name.current,
        price: price.current,
        sex: sex.current.key,
        description: description.current,
        fabrics: (fabrics.current as any)[0].key, // TODO temporary
        category: category.current,
        colors: data.colors
      });

      await uploadToDB(item.itemId);
      handleNextStep();
    } else {
      const item = await createItem({
        brand: brand.current,
        name: name.current,
        price: price.current,
        sex: sex.current.key,
        description: description.current,
        fabrics: (fabrics.current as any)[0].key, // TODO temporary
        category: category.current,
        colors: data.colors
      });

      await uploadToDB(item.itemId);
      handleNextStep();
    }
  };
  return (
    <div className={clsxm('mx-auto max-w-3xl px-4', isDeleting && ' cursor-progress')}>
      <RoundedBox
        className={clsxm(
          'relative my-16 w-full overflow-visible p-0',
          isDeleting && 'pointer-events-none select-none'
        )}
      >
        <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
          <LargeBodyText>{isEdit ? 'Item details' : 'Item creation'}</LargeBodyText>
          {isEdit && (
            <button type="button" onClick={handleDeleteItem}>
              {isDeleting ? <LargeBodyText>Deleting...</LargeBodyText> : <SvgIcon name="Trash" />}
            </button>
          )}
        </div>
        {/* <div className="absolute h-full w-full bg-primaryBlack/20" /> */}
        {step === 1 && (
          <ItemInfoForm
            onSubmit={handleSubmitItemInfoForm}
            images={images}
            setImages={setImages}
            defaultValues={itemInfoFormDefaultValues}
            setColorSizeDirty={setColorSizeDirty}
            isLoading={isEdit && isLoadingDetails}
          />
        )}
        {step === 2 && colors.current && sizes.current && (
          <ItemAvailabilityForm
            sizes={sizes.current as OptionType<ItemAvailabilityType['colors'][0]['sizes']>}
            colors={colors.current as OptionType<ItemAvailabilityType['colors']>}
            defaultValues={itemAvailabilityFormDefaultValues}
            onSubmit={handleSubmitItemAvailabilityForm}
            handlePreviousStep={handlePreviousStep}
            isEdit={isEdit}
          />
        )}
        {step === 3 && (
          <div className="m-7 flex flex-col gap-5 md:mx-14">
            <div className="my-12 flex flex-col items-center justify-center">
              <SvgIcon name="Check" className="h-8 w-8" />
              <LargeBodyText>
                {isEdit ? 'Item edited successfully!' : 'Item created successfully!'}
              </LargeBodyText>
            </div>
            <div className="mt-4 flex justify-start gap-3 self-end">
              {!isEdit && (
                <Button onClick={() => window.location.reload()}>Add another item</Button>
              )}
              <LinkButton href="/admin">Back to Admin Panel</LinkButton>
            </div>
          </div>
        )}
      </RoundedBox>
    </div>
  );
};

export default ItemCreator;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);

  if (session?.user?.role !== 'ADMIN') {
    return { redirect: { destination: '/' }, props: {} };
  }

  return {
    props: {}
  };
};
