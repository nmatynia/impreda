import React, { useEffect, useState } from 'react';
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

// TODO: Handle multiple fabrics
const ItemCreatorPage = () => {
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
              brand: brand || itemData.brand,
              name: name || itemData.name,
              description: description || itemData.description,
              category: categoryOptions?.find(
                categoryOption => categoryOption.key === (category || itemData?.category?.[0]?.id)
              ) as ItemDetailsType['category'],
              sizes:
                sizes ||
                [...new Set(itemData.sizes.map(size => size.name))].map(sizeName => ({
                  key: sizeName,
                  name: sizeName
                })),
              colors:
                colors ||
                itemData.colors.map(color => ({
                  key: color.name.toLowerCase(),
                  name: color.name,
                  hex: color.hex
                })),
              fabrics: fabrics || [
                {
                  key: itemData.fabrics,
                  name: itemData.fabrics.slice(0, 1).toUpperCase() + itemData.fabrics.slice(1)
                }
              ],
              sex: sex || {
                name: itemData.sex.slice(0, 1) + itemData.sex.slice(1).toLowerCase(),
                key: itemData.sex
              },
              price: price?.toString() || itemData.price.toString()
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
  const handlePreviousStep = async () => {
    setStep(step - 1);
  };
  const [colorSizeDirty, setColorSizeDirty] = useState<boolean>(false);
  const [images, setImages] = useState<ImageType[]>([]);
  const [brand, setBrand] = useState<string>();
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [sex, setSex] = useState<OptionType<{ key: SexType }>>();
  const [sizes, setSizes] = useState<OptionType[]>();
  const [colors, setColors] = useState<OptionType[]>();
  const [fabrics, setFabrics] = useState<OptionType[]>();
  const [category, setCategory] = useState<string>();

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

  const uploadImage = async (itemId: string) => {
    const requests = images.map(async image => {
      if (!image.file) return;
      const filename = encodeURIComponent(image.file.name ?? '');

      const { url, fields }: { url: string; fields: AWS.S3.PresignedPost.Fields } =
        await createPresignedUrl({
          filename,
          itemId
        });

      const data = {
        ...fields,
        'Content-Type': image.file.type,
        file: image.file
      };
      const formData = new FormData();

      Object.entries(data).forEach(([name, value]) => {
        formData.append(name, value as string | Blob);
      });

      fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
    });
    await Promise.all(requests);
  };

  const handleSubmitItemInfoForm: SubmitHandler<ItemDetailsType> = async (data, e) => {
    e?.preventDefault();
    setBrand(data.brand);
    setName(data.name);
    setPrice(Number(data.price));
    setSex(data.sex);
    setSizes(data.sizes);
    setColors(data.colors);
    setFabrics(data.fabrics);
    setDescription(data.description);
    setCategory(data.category.key);
    handleNextStep();
  };

  const handleSubmitItemAvailabilityForm: SubmitHandler<ItemAvailabilityType> = async (data, e) => {
    e?.preventDefault();
    if (!(brand && name && price && sex && description && fabrics && category)) {
      return;
    }
    if (isEdit) {
      const updateParams = {
        id: itemId,
        brand,
        name,
        price,
        sex: sex.key,
        description,
        fabrics: (fabrics as any)[0].key,
        category,
        colors: data.colors
      };
      const item = await updateItem(updateParams);
      await uploadImage(item.itemId);
      handleNextStep();
    } else {
      const item = await createItem({
        brand,
        name,
        price,
        sex: sex.key,
        description,
        fabrics: (fabrics as any)[0].key,
        category,
        colors: data.colors
      });

      await uploadImage(item.itemId);
      handleNextStep();
    }
  };

  useEffect(() => {
    if (
      !(
        brand &&
        category &&
        categoryOptions &&
        colors &&
        description &&
        fabrics &&
        name &&
        price &&
        sex &&
        sizes
      )
    ) {
      return;
    }

    setItemInfoFormDefaultValues({
      brand,
      name,
      description,
      category: categoryOptions?.find(
        categoryOption => categoryOption.key === category
      ) as ItemDetailsType['category'],
      sizes,
      colors,
      fabrics,
      sex,
      price: price?.toString()
    });
  }, [brand, category, categoryOptions, colors, description, fabrics, name, price, sex, sizes]);

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
        {step === 2 && colors && sizes && (
          <ItemAvailabilityForm
            sizes={sizes as OptionType<ItemAvailabilityType['colors'][0]['sizes']>}
            colors={colors as OptionType<ItemAvailabilityType['colors']>}
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

export default ItemCreatorPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);

  if (session?.user?.role !== 'ADMIN') {
    return { redirect: { destination: '/' }, props: {} };
  }

  return {
    props: {}
  };
};
