import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../button/Button';
import { Form } from '../../forms/Form';
import { InputField } from '../../forms/InputField';
import { OptionType } from '../../select/Select';

export const ItemDetailsSchema = z.object({
  sizes: z.array(z.object({ key: z.string(), name: z.string() })),
  colors: z.array(z.object({ key: z.string(), name: z.string() }))
});

export type ItemDetailsType = z.infer<typeof ItemDetailsSchema>;

type ItemAvailabilityProps = {
  handleCloseDialog: () => void;
  onSubmit: SubmitHandler<ItemDetailsType>;
  sizes: OptionType[];
  colors: OptionType[];
};

export const ItemAvailabilityForm = ({
  handleCloseDialog,
  onSubmit,
  sizes,
  colors
}: ItemAvailabilityProps) => {
  const methods = useForm<ItemDetailsType>({
    resolver: zodResolver(ItemDetailsSchema),
    defaultValues: {}
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
        <InputField
          label="Price"
          placeholder={"Enter item's brand"}
          name="price"
          className="w-full"
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
