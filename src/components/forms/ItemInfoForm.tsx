import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
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
  isLoading: boolean;
  onSubmit: SubmitHandler<ItemDetailsType>;
  setImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
  setColorSizeDirty: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ItemInfoForm = ({
  className,
  images,
  defaultValues,
  isLoading,
  setImages,
  onSubmit,
  setColorSizeDirty
}: ItemInfoFormProps) => {
  const methods = useForm<ItemDetailsType>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues
  });
  const { data: categoryOptions } = trpc.categories.getAllCategories.useQuery();
  const { handleSubmit, formState, reset } = methods;
  console.log('errors: ', formState.errors);
  useEffect(() => {
    if (!isLoading) reset(defaultValues);
  }, [isLoading, defaultValues, reset]);

  // If the sizes or colors fields are dirty then the ItemAvailabilityForm won't make use of default values
  useEffect(() => {
    setColorSizeDirty(!!formState.dirtyFields.colors || !!formState.dirtyFields.sizes);
  }, [formState.dirtyFields.colors, formState.dirtyFields.sizes, setColorSizeDirty]);

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)} {...methods}>
      <div className="m-7 flex flex-col gap-8 md:mx-14">
        <ImageUploader images={images} setImages={setImages} isLoading={isLoading} />
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <InputField
            label="Brand:"
            placeholder={"Enter item's brand"}
            name="brand"
            className="w-full md:w-1/2"
            isLoading={isLoading}
          />
          <InputField
            label="Name:"
            placeholder={"Enter item's name"}
            name="name"
            className="w-full md:w-1/2"
            isLoading={isLoading}
          />
        </div>
        <div className="flex w-full flex-col gap-8 md:flex-row">
          <InputField
            label="Price"
            placeholder={"Enter item's brand"}
            name="price"
            type="number"
            className="w-full md:w-1/2"
            isLoading={isLoading}
          />
          <SelectField
            placeholder="Choose sex"
            name="sex"
            label="Sex"
            className="z-50 w-full md:w-1/2"
            options={sexOptions}
            isLoading={isLoading}
          />
        </div>
        <TextAreaField
          label="Description"
          placeholder={"Enter item's or brand's description"}
          name="description"
          className="w-full"
          isLoading={isLoading}
        />
        <SelectField
          placeholder="Choose category"
          name="category"
          label="Category:"
          className="z-40 w-full"
          options={categoryOptions ?? []}
          isLoading={isLoading}
        />
        <SelectField
          placeholder="Choose sizes"
          name="sizes"
          label="Sizes:"
          className="z-30 w-full"
          options={sizeOptions}
          isLoading={isLoading}
          multiple
        />
        <SelectField
          placeholder="Choose colors"
          name="colors"
          label="Colors:"
          className="z-20 w-full"
          options={colorOptions}
          isLoading={isLoading}
          multiple
        />
        <SelectField
          placeholder="Choose fabrics"
          name="fabrics"
          label="Fabrics:"
          className="z-10 w-full"
          options={fabricOptions}
          isLoading={isLoading}
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
