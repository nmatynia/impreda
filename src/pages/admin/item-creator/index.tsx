import React, { useState } from 'react';
import { RoundedBox } from '../../../components/box/RoundedBox';
import { BodyText, LargeBodyText } from '../../../components/typography/Typography';
import { ItemDetailsType, ItemInfoForm } from '../../../components/forms/ItemInfoForm';
import { OptionType } from '../../../components/select/Select';
import { SubmitHandler } from 'react-hook-form';
import {
  ItemAvailabilityForm,
  ItemAvailabilityType
} from '../../../components/forms/ItemAvailabilityForm';
import { ImageType } from '../../../components/image-uploader/ImageUploader';
import { trpc } from '../../../utils/trpc';
import { SvgIcon } from '../../../components/icons/SvgIcon';
import { Button } from '../../../components/button/Button';
import Link from 'next/link';
import { LinkButton } from '../../../components/link/LinkButton';

const index = () => {
  const [step, setStep] = React.useState<number>(1);
  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const [images, setImages] = useState<ImageType[]>([]);
  const brand = React.useRef<string>();
  const name = React.useRef<string>();
  const price = React.useRef<number>();
  const description = React.useRef<string>();
  const sex = React.useRef<'MALE' | 'FEMALE' | 'UNISEX'>();
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

  const { mutateAsync: createItem } = trpc.items.createItem.useMutation();

  const uploadToDB = async (itemId: string) => {
    const requests: Promise<Response>[] = [];
    for (let image of images) {
      if (!image.file) return;
      const filename = encodeURIComponent(image.file.name ?? '');
      const { url, fields }: { url: string; fields: any } = (await createPresignedUrl({
        filename: filename,
        itemId
      })) as any;

      const data = {
        ...fields,
        'Content-Type': image.file.type,
        file: image.file
      };
      const formData = new FormData();
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
    sex.current = data.sex.key;
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
        sex: sex.current,
        description: description.current,
        fabrics: (fabrics.current as any)[0].key, //TODO temporary
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
        <div className="flex w-full items-center border-b-[1px] border-primaryBlack p-8">
          <LargeBodyText>Add new item</LargeBodyText>
        </div>
        {step === 1 && (
          <ItemInfoForm onSubmit={handleSubmitItemInfoForm} images={images} setImages={setImages} />
        )}
        {step === 2 && colors.current && sizes.current && (
          <ItemAvailabilityForm
            sizes={sizes.current as OptionType<ItemAvailabilityType['colors'][0]['sizes']>}
            colors={colors.current as OptionType<ItemAvailabilityType['colors']>}
            handlePreviousStep={handlePreviousStep}
            onSubmit={handleSubmitItemAvailabilityForm}
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
              <LinkButton href={'/admin'}>Back to Admin Panel</LinkButton>
            </div>
          </div>
        )}
      </RoundedBox>
    </div>
  );
};

export default index;
