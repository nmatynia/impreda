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

const ItemCreator = () => {
  const { id: itemId } = useRouter().query;
  const isEdit = !!itemId && typeof itemId === 'string';
  const { data: itemData } = trpc.items.getItem.useQuery(itemId as string, {
    enabled: isEdit
  });
  const { data: categoryOptions } = trpc.categories.getAllCategories.useQuery();

  const [step, setStep] = React.useState<number>(1);
  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

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

  const itemInfoFormDefaultValues = useMemo<ItemDetailsType | undefined>(
    () =>
      itemData
        ? {
            brand: brand.current ?? itemData.brand,
            name: name.current ?? itemData.name,
            description: description.current ?? itemData.description,
            category: categoryOptions?.find(
              category => category.key === itemData?.category?.[0]?.id
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
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      itemData,
      categoryOptions,
      brand.current,
      name.current,
      price.current,
      sex.current,
      sizes.current,
      colors.current,
      fabrics.current,
      description.current,
      category.current
    ]
  );

  const itemAvailabilityFormDefaultValues = useMemo<ItemAvailabilityType | undefined>(
    () =>
      itemData
        ? {
            colors: itemData.colors.map(color => ({
              key: color.name,
              name: color.name,
              hex: color.hex,
              sizes: color.sizes.map(size => ({
                key: size.name,
                name: size.name,
                available: !colors.current || !sizes.current ? size.available.toString() : '0'
              }))
            }))
          }
        : undefined,
    [itemData]
  );

  const utils = trpc.useContext();

  const { mutateAsync: createPresignedUrl } = trpc.images.createPresignedUrl.useMutation({
    onSuccess: () => {
      utils.images.invalidate();
    }
  });

  const { mutateAsync: deleteItem } = trpc.items.deleteItem.useMutation({
    onSuccess: () => {
      utils.items.invalidate();
    }
  });

  const { mutateAsync: createItem } = trpc.items.createItem.useMutation();

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
      brand.current &&
      name.current &&
      price.current &&
      sex.current &&
      description.current &&
      fabrics.current &&
      category.current
    ) {
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
    <div className="mx-auto max-w-3xl px-4">
      <RoundedBox className="my-16 w-full overflow-visible p-0">
        <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
          <LargeBodyText>Add new item</LargeBodyText>
          {isEdit && (
            <button type="button" onClick={() => deleteItem(itemId)}>
              <SvgIcon name="Trash" />
            </button>
          )}
        </div>
        {step === 1 &&
          itemInfoFormDefaultValues && ( // TODO: temporary
            <ItemInfoForm
              onSubmit={handleSubmitItemInfoForm}
              images={images}
              setImages={setImages}
              defaultValues={itemInfoFormDefaultValues}
            />
          )}
        {step === 2 && colors.current && sizes.current && (
          <ItemAvailabilityForm
            sizes={sizes.current as OptionType<ItemAvailabilityType['colors'][0]['sizes']>}
            colors={colors.current as OptionType<ItemAvailabilityType['colors']>}
            defaultValues={itemAvailabilityFormDefaultValues}
            onSubmit={handleSubmitItemAvailabilityForm}
            handlePreviousStep={handlePreviousStep}
          />
        )}
        {step === 3 && (
          <div className="m-7 flex flex-col gap-5 md:mx-14">
            <div className="my-12 flex flex-col items-center justify-center">
              <SvgIcon name="Check" className="h-8 w-8" />
              <LargeBodyText>Item created successfully!</LargeBodyText>
            </div>
            <div className="mt-4 flex justify-start gap-3 self-end">
              <Button onClick={() => window.location.reload()}>Add another item</Button>
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
