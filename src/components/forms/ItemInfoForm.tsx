import { zodResolver } from '@hookform/resolvers/zod';
import { String } from 'aws-sdk/clients/apigateway';
import { randomUUID } from 'crypto';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import clsxm from '../../utils/clsxm';
import { trpc } from '../../utils/trpc';
import { Button } from '../button/Button';
import { DialogModal } from '../dialog/DialogModal';
import { SvgIcon } from '../icons/SvgIcon';
import { BodyText } from '../typography/Typography';
import { Form } from './Form';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextAreaField } from './TextAreaField';

export const ItemDetailsSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.string(), // TODO - make this a number
  sex: z.object({ key: z.string(), name: z.string() }),
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

const categoryOptions = [
  { name: 'Tops', key: 'tops' },
  { name: 'Bottoms', key: 'bottoms' },
  { name: 'Dresses', key: 'dresses' },
  { name: 'Sweaters', key: 'sweaters' },
  { name: 'Coats', key: 'coats' },
  { name: 'Suits', key: 'suits' },
  { name: 'Shoes', key: 'shoes' },
  { name: 'Accessories', key: 'accessories' },
  { name: 'Jacket', key: 'jacket' },
  { name: 'Jewelry', key: 'jewelry' },
  { name: 'Bags', key: 'bags' },
  { name: 'Beauty', key: 'beauty' }
];

type ItemInfoFormProps = {
  handleCloseDialog?: () => void;
  onSubmit: SubmitHandler<ItemDetailsType>;
  className?: string;
};

export const ItemInfoForm = ({ handleCloseDialog, onSubmit, className }: ItemInfoFormProps) => {
  const methods = useForm<ItemDetailsType>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      // size: [sizeOptions[0]],
      // sex: sexOptions[0]
    }
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = methods;

  const utils = trpc.useContext();

  const { mutateAsync: createPresignedUrl } = trpc.images.createPresignedUrl.useMutation({
    onSuccess: () => {
      utils.images.invalidate();
    }
  });

  const fileRef = useRef<HTMLInputElement>(null);

  const uploadToDB = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const filename = encodeURIComponent(file?.name ?? '');
    const { url, fields }: { url: string; fields: any } = (await createPresignedUrl({
      filename: filename,
      itemId: '-1'
    })) as any;
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

  type Image = {
    src: string;
    filename: string;
  };
  const [images, setImages] = useState<Image[]>([]);
  const [previewedImage, setPreviewedImage] = useState<Image>();

  const handleImageChange = (e: any) => {
    const files: Blob[] = Array.from(e.target.files);
    console.log(files);
    const imagesObj = files.map(file => ({
      src: URL.createObjectURL(file),
      filename: file.name
    }));
    setImages([...images, ...imagesObj]);
  };

  const handleDeleteImage = (src: string) => {
    const newImages = images.filter(image => image.src !== src);
    setImages(newImages);
  };
  return (
    <>
      <Form className={className} onSubmit={handleSubmit(onSubmit)} {...methods}>
        <div className="m-7 flex flex-col gap-8 md:mx-14">
          <div
            className={clsxm(
              'relative flex h-32 w-full flex-col items-center justify-center border-[1px] border-dashed border-primaryBlack',
              'cursor-pointer gap-2 focus-within:border-[2px]'
            )}
          >
            <SvgIcon name="Upload" />
            <BodyText>Upload item's photos</BodyText>
            <input
              id="file-uploader"
              className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
              ref={fileRef}
              onChange={handleImageChange}
              type="file"
              accept="image/png, image/jpeg"
              name="images"
              multiple
            />
          </div>
          {images.length > 0 && (
            <div className="flex w-full gap-4 overflow-x-auto">
              {images.map((image, idx) => (
                <div className="relative mt-2 h-32 w-32 flex-shrink-0 border-[1px] border-primaryBlack">
                  <button
                    className={clsxm(
                      'flex items-center justify-center',
                      'absolute top-0 right-0 z-10 h-4 w-4 translate-x-1/2 -translate-y-1/2',
                      'cursor-pointer rounded-full bg-primaryBlack'
                    )}
                    onClick={() => handleDeleteImage(image.src)}
                  >
                    <SvgIcon name="Cross" className="h-2 w-2 fill-primaryWhite" />
                  </button>
                  <Image
                    key={`image-${idx}`}
                    src={image.src}
                    alt="item"
                    className="z-0 object-cover"
                    fill
                    onClick={() => {
                      console.log(image);
                      setPreviewedImage(image);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
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
              className="z-40 w-full md:w-1/2"
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
            className="z-30 w-full"
            options={categoryOptions}
          />
          <SelectField
            placeholder="Choose sizes"
            name="sizes"
            label="Sizes:"
            className="z-20 w-full"
            options={sizeOptions}
            multiple
          />
          <SelectField
            placeholder="Choose colors"
            name="colors"
            label="Colors:"
            className="z-10 w-full"
            options={colorOptions}
            multiple
          />
          <SelectField
            placeholder="Choose fabrics"
            name="fabrics"
            label="Fabrics:"
            className="z-0 w-full"
            options={fabricOptions}
            multiple
          />
          <div className="mt-4 flex flex-row-reverse justify-start gap-3">
            <Button type="submit">Advance</Button>
            <Button variant="outlined" onClick={handleCloseDialog}>
              Cancel
            </Button>
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
