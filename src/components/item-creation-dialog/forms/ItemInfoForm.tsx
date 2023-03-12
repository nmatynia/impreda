import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../button/Button';
import { Form } from '../../forms/Form';
import { InputField } from '../../forms/InputField';
import { SelectField } from '../../forms/SelectField';

export const ItemDetailsSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.string(), // TODO - make this a number
  sex: z.object({ key: z.string(), name: z.string() }),
  sizes: z.array(z.object({ key: z.string(), name: z.string() })),
  colors: z.array(z.object({ key: z.string(), name: z.string() })),
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
  { name: 'Men', key: 'men' },
  { name: 'Women', key: 'women' },
  { name: 'Unisex', key: 'unisex' }
];

const colorOptions = [
  { name: 'Red', key: 'red' },
  { name: 'Blue', key: 'blue' },
  { name: 'Green', key: 'green' },
  { name: 'Yellow', key: 'yellow' },
  { name: 'Black', key: 'black' },
  { name: 'White', key: 'white' },
  { name: 'Pink', key: 'pink' },
  { name: 'Purple', key: 'purple' },
  { name: 'Orange', key: 'orange' },
  { name: 'Brown', key: 'brown' },
  { name: 'Grey', key: 'grey' }
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
  handleCloseDialog: () => void;
  onSubmit: SubmitHandler<ItemDetailsType>;
};

export const ItemInfoForm = ({ handleCloseDialog, onSubmit }: ItemInfoFormProps) => {
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...methods}>
      <div className="mt-7 flex flex-col gap-8">
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <InputField
            label="Brand:"
            placeholder={"Enter item's brand"}
            name="brand"
            className="w-1/2"
          />
          <InputField
            label="Name:"
            placeholder={"Enter item's name"}
            name="name"
            className="w-1/2"
          />
        </div>
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <InputField
            label="Price"
            placeholder={"Enter item's brand"}
            name="price"
            className="w-1/2"
          />
          <SelectField
            placeholder="Choose sex"
            name="sex"
            label="Sex"
            className="z-30 w-1/2"
            options={sexOptions}
          />
        </div>
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
  );
};
