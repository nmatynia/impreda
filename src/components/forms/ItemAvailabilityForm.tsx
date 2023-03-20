import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Control, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import clsxm from '../../utils/clsxm';
import { isDark } from '../../utils/helpers/isDark';
import { Button } from '../button/Button';
import { OptionType } from '../select/Select';
import { BodyText, Bold } from '../typography/Typography';
import { Form } from './Form';
import { InputField } from './InputField';

export const ItemAvailabilitySchema = z.object({
  colors: z.array(
    z.object({
      hex: z.string(),
      key: z.string(),
      name: z.string(),
      sizes: z
        .array(
          z.object({
            key: z.string(),
            name: z.enum(['XS', 'S', 'M', 'L', 'XL']),
            available: z.string()
          })
        )
        .default([])
    })
  )
});

export type ItemAvailabilityType = z.infer<typeof ItemAvailabilitySchema>;

type ItemAvailabilityProps = {
  handlePreviousStep: () => void;
  onSubmit: SubmitHandler<ItemAvailabilityType>;
  sizes: OptionType<ItemAvailabilityType['colors'][0]['sizes']>;
  colors: OptionType<ItemAvailabilityType['colors']>;
};

export const ItemAvailabilityForm = ({
  handlePreviousStep,
  onSubmit,
  sizes,
  colors
}: ItemAvailabilityProps) => {
  const methods = useForm<ItemAvailabilityType>({
    resolver: zodResolver(ItemAvailabilitySchema),
    defaultValues: {}
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = methods;

  const { fields: colorFields, replace } = useFieldArray({
    control,
    name: 'colors'
  });

  useEffect(() => {
    replace(colors.map(color => ({ ...color, sizes: [] })));
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...methods}>
      <div className="m-7 flex flex-col gap-8 md:mx-14">
        {colorFields.map((color, index) => {
          return (
            <div key={color.id} className="flex flex-col gap-8">
              <div
                className={clsxm('flex items-center justify-center rounded-sm py-1 shadow-sm ')}
                style={{ backgroundColor: color.hex }}
              >
                <BodyText className={isDark(color.hex) ? 'text-primaryWhite' : 'text-primaryBlack'}>
                  {color.name}
                </BodyText>
              </div>
              <SizeField control={control} sizeIndex={index} sizes={sizes} />
            </div>
          );
        })}
        <div className="mt-4 flex flex-row-reverse justify-start gap-3">
          <Button type="submit">Advance</Button>
          <Button variant="outlined" onClick={handlePreviousStep}>
            Back
          </Button>
        </div>
      </div>
    </Form>
  );
};

const SizeField = ({
  control,
  sizeIndex,
  sizes
}: {
  control: Control<ItemAvailabilityType>;
  sizeIndex: number;
  sizes: OptionType<ItemAvailabilityType['colors'][0]['sizes']>;
}) => {
  const { fields: sizeFields, replace } = useFieldArray({
    control,
    name: `colors.${sizeIndex}.sizes`
  });

  useEffect(() => {
    replace(sizes);
  }, []);

  return (
    <ul className="flex flex-col gap-4">
      {sizeFields.map((size, index) => {
        return (
          <li className="grid grid-cols-6 px-5">
            <BodyText className="col-span-1">
              <Bold>{size.name}</Bold>
            </BodyText>
            <div className="col-span-5">
              <InputField
                name={`colors[${sizeIndex}].sizes[${index}].available`}
                placeholder="Quantity"
                className="w-full"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};
