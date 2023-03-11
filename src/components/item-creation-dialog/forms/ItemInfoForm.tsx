import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../button/Button';
import { Form } from '../../forms/Form';
import { InputField } from '../../forms/InputField';
import { SelectField } from '../../forms/SelectField';
import { BodyText } from '../../typography/Typography';

export const ItemDetailsSchema = z.object({
  name: z.string(),
  brand: z.string(),
  size: z.object({ id: z.string(), name: z.string() }),
  sex: z.object({ id: z.string(), name: z.string() })
});

type ItemDetailsType = z.infer<typeof ItemDetailsSchema>;

const sizeOptions = [
  { name: 'XS', id: 'XS' },
  { name: 'S', id: 'S' },
  { name: 'M', id: 'M' },
  { name: 'L', id: 'L' },
  { name: 'XL', id: 'XL' },
  { name: 'XXL', id: 'XXL' }
];

const sexOptions = [
  { name: 'Men', id: 'men' },
  { name: 'Women', id: 'women' },
  { name: 'Unisex', id: 'unisex' }
];

export const ItemInfoForm = ({ handleCloseDialog }: { handleCloseDialog: () => void }) => {
  const methods = useForm<ItemDetailsType>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {
      size: sizeOptions[0],
      sex: sexOptions[0],
      name: undefined,
      brand: undefined
    }
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit: SubmitHandler<ItemDetailsType> = async (data, e) => {
    handleCloseDialog();
    e?.preventDefault();
    console.log(data);
    // await updateUser(data);
    // handleDisableEditing();
  };

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
          <SelectField name="sex" label="Sex" className="z-10 w-1/2" options={sexOptions} />
          <InputField
            label="Price"
            placeholder={"Enter item's brand"}
            name="brand"
            className="w-1/2"
          />
        </div>
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <SelectField name="size" label="Size" className="w-full" options={sizeOptions} />
        </div>
      </div>
      <div className="mt-4 flex flex-row-reverse justify-start gap-3">
        <Button type="submit">Add item</Button>
        <Button variant="outlined" onClick={handleCloseDialog}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};
