import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React, { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '../../utils/trpc';
import { Button } from '../button/Button';
import { DialogModal } from '../dialog/DialogModal';
import { ImageUploader } from '../image-uploader/ImageUploader';
import type { ImageType } from '../image-uploader/ImageUploader';
import type { OptionType } from '../select/Select';
import { Form } from './Form';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextAreaField } from './TextAreaField';
import { LinkButton } from '../link/LinkButton';

export const ItemDetailsSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.string(), // TODO - make this a number
  sex: z.object({ key: z.enum(['MALE', 'FEMALE', 'UNISEX']), name: z.string() }),
  description: z.string(),
  category: z.object({ key: z.string(), name: z.string() }),
  sizes: z.array(z.object({ key: z.string(), name: z.string() })),
  colors: z.array(z.object({ key: z.string(), name: z.string(), hex: z.string().optional() })),
  fabrics: z.array(z.object({ key: z.string(), name: z.string() }))
});

export type ItemDetailsType = z.infer<typeof ItemDetailsSchema>;

const sizeOptions = [
  { name: 'XS', key: 'XS' },
  { name: 'S', key: 'S' },
  { name: 'M', key: 'M' },
  { name: 'L', key: 'L' },
  { name: 'XL', key: 'XL' },
  { name: 'XXL', key: 'XXL' }
];

const sexOptions = [
  { name: 'Male', key: 'MALE' },
  { name: 'Female', key: 'FEMALE' },
  { name: 'Unisex', key: 'UNISEX' }
];

const colorOptions = [
  { name: 'Red', key: 'red', hex: '#FF0000' },
  { name: 'Blue', key: 'blue', hex: '#323ea8' },
  { name: 'Green', key: 'green', hex: '#00c469' },
  { name: 'Yellow', key: 'yellow', hex: '#d9e000' },
  { name: 'Black', key: 'black', hex: '#141414' },
  { name: 'White', key: 'white', hex: '#f7f7f7' },
  { name: 'Pink', key: 'pink', hex: '#ff38e4' },
  { name: 'Purple', key: 'purple', hex: '#bb00ff' },
  { name: 'Orange', key: 'orange', hex: '#ffc117' },
  { name: 'Brown', key: 'brown', hex: '#52482e' },
  { name: 'Grey', key: 'grey', hex: '#919191' }
];

const fabricOptions = [
  { name: 'Cotton', key: 'cotton' },
  { name: 'Silk', key: 'silk' },
  { name: 'Wool', key: 'wool' },
  { name: 'Linen', key: 'linen' },
  { name: 'Polyester', key: 'polyester' },
  { name: 'Rayon', key: 'rayon' },
  { name: 'Nylon', key: 'nylon' },
  { name: 'Denim', key: 'denim' },
  { name: 'Canvas', key: 'canvas' },
  { name: 'Velvet', key: 'velvet' }
];

type ItemInfoFormProps = {
  handleCloseDialog?: () => void;
  onSubmit: SubmitHandler<ItemDetailsType>;
  className?: string;
  images: ImageType[];
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
};

export const ItemInfoForm = ({
  handleCloseDialog,
  onSubmit,
  className,
  images,
  setImages
}: ItemInfoFormProps) => {
  const methods = useForm<ItemDetailsType>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {}
  });

  const utils = trpc.useContext();
  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);
  trpc.categories.getAllCategories.useQuery(undefined, {
    onSuccess: val => {
      utils.images.invalidate();
      setCategoryOptions(val.categories);
    }
  }).data ?? [];

  const { handleSubmit } = methods;

  type Image = {
    src: string;
    filename: string;
  };
  const [previewedImage, setPreviewedImage] = useState<Image>();

  return (
    <>
      <Form className={className} onSubmit={handleSubmit(onSubmit)} {...methods}>
        <div className="m-7 flex flex-col gap-8 md:mx-14">
          <ImageUploader name="images" images={images} setImages={setImages} />
          <div className="flex w-full flex-col gap-6 md:flex-row">
            <InputField
              label="Brand:"
              placeholder={"Enter item's brand"}
              name="brand"
              className="w-full md:w-1/2"
            />
            <InputField
              label="Name:"
              placeholder={"Enter item's name"}
              name="name"
              className="w-full md:w-1/2"
            />
          </div>
          <div className="flex w-full flex-col gap-6 md:flex-row">
            <InputField
              label="Price"
              placeholder={"Enter item's brand"}
              name="price"
              type="number"
              className="w-full md:w-1/2"
            />
            <SelectField
              placeholder="Choose sex"
              name="sex"
              label="Sex"
              className="z-50 w-full md:w-1/2"
              options={sexOptions}
            />
          </div>
          <TextAreaField
            label="Description"
            placeholder={"Enter item's or brand's description"}
            name="description"
            className="w-full"
          />
          <SelectField
            placeholder="Choose category"
            name="category"
            label="Category:"
            className="z-40 w-full"
            options={categoryOptions}
          />
          <SelectField
            placeholder="Choose sizes"
            name="sizes"
            label="Sizes:"
            className="z-30 w-full"
            options={sizeOptions}
            multiple
          />
          <SelectField
            placeholder="Choose colors"
            name="colors"
            label="Colors:"
            className="z-20 w-full"
            options={colorOptions}
            multiple
          />
          <SelectField
            placeholder="Choose fabrics"
            name="fabrics"
            label="Fabrics:"
            className="z-10 w-full"
            options={fabricOptions}
            multiple
          />
          <div className="mt-4 flex flex-row-reverse justify-start gap-3">
            <Button type="submit">Advance</Button>
            <LinkButton variant="outlined" href='/admin'>
              Back to Admin Panel
            </LinkButton>
          </div>
        </div>
      </Form>
      <DialogModal
        title={previewedImage?.filename ?? 'Image preview'}
        isOpen={!!previewedImage}
        handleCloseDialog={() => setPreviewedImage(undefined)}
      >
        <div className="relative aspect-[0.75] max-h-screen w-full overflow-hidden rounded-sm">
          <Image src={previewedImage?.src ?? ''} alt="item" className="z-0 object-contain" fill />
        </div>
      </DialogModal>
    </>
  );
};
