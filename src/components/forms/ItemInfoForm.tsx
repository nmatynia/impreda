import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '../../utils/trpc';
import { Button } from '../button/Button';
import { ImageUploader } from '../image-uploader/ImageUploader';
import type { ImageType } from '../image-uploader/ImageUploader';
import { Form } from './Form';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextAreaField } from './TextAreaField';
import { LinkButton } from '../link/LinkButton';
import { colorOptions, fabricOptions, sexOptions, sizeOptions } from '../../utils/constants';

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

type ItemInfoFormProps = {
  images: ImageType[];
  className?: string;
  defaultValues?: ItemDetailsType;
  onSubmit: SubmitHandler<ItemDetailsType>;
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
};

export const ItemInfoForm = ({
  className,
  images,
  defaultValues,
  setImages,
  onSubmit
}: ItemInfoFormProps) => {
  const methods = useForm<ItemDetailsType>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues
  });
  const { data: categoryOptions } = trpc.categories.getAllCategories.useQuery();
  const { handleSubmit } = methods;

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)} {...methods}>
      <div className="m-7 flex flex-col gap-8 md:mx-14">
        <ImageUploader images={images} setImages={setImages} />
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
          options={categoryOptions ?? []}
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
          <LinkButton variant="outlined" href="/admin">
            Back to Admin Panel
          </LinkButton>
        </div>
      </div>
    </Form>
  );
};
