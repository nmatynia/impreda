import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useMemo } from 'react';
import type { Control, SubmitHandler } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import clsxm from '../../utils/clsxm';
import { isDark } from '../../utils/helpers/isDark';
import { Button } from '../button/Button';
import type { OptionType } from '../select/Select';
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
  sizes: OptionType<ItemAvailabilityType['colors'][0]['sizes']>;
  colors: OptionType<ItemAvailabilityType['colors']>;
  defaultValues?: ItemAvailabilityType;
  isEdit: boolean;
  onSubmit: SubmitHandler<ItemAvailabilityType>;
  handlePreviousStep: () => void;
};

export const ItemAvailabilityForm = ({
  sizes,
  colors,
  defaultValues: initialValues,
  isEdit,
  onSubmit,
  handlePreviousStep
}: ItemAvailabilityProps) => {
  const defaultValues: ItemAvailabilityType | undefined = useMemo(
    () =>
      initialValues && {
        colors: initialValues.colors
          .filter(defaultColor => colors.find(color => color.name === defaultColor.name))
          .map(defaultColor => ({ ...defaultColor, key: defaultColor.key.toLowerCase() }))
      },
    [initialValues, colors]
  );

  const methods = useForm<ItemAvailabilityType>({
    resolver: zodResolver(ItemAvailabilitySchema),
    defaultValues: {
      colors: colors.map(color => {
        const defaultColor = defaultValues?.colors.find(({ key }) => key === color.key);
        return { ...color, sizes: defaultColor?.sizes || [] };
      })
    }
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting }
  } = methods;

  const { fields: colorFields, replace } = useFieldArray({
    control,
    name: 'colors'
  });

  useEffect(() => {
    replace(
      colors.map(color => {
        const defaultColor = defaultValues?.colors.find(({ key }) => key === color.key);
        return { ...color, sizes: defaultColor?.sizes || [] };
      })
    );
  }, [replace, colors, defaultValues]);

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
              <SizeField
                control={control}
                sizeIndex={index}
                sizes={sizes}
                defaultValues={defaultValues?.colors.find(({ key }) => key === color.key)?.sizes}
              />
            </div>
          );
        })}
        <div className="mt-4 flex flex-row-reverse justify-start gap-3">
          <Button type="submit" isLoading={isSubmitting}>
            {isEdit ? 'Edit the item' : 'Add the item'}
          </Button>
          <Button variant="outlined" disabled={isSubmitting} onClick={handlePreviousStep}>
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
  sizes,
  defaultValues
}: {
  control: Control<ItemAvailabilityType>;
  sizeIndex: number;
  sizes: OptionType<ItemAvailabilityType['colors'][0]['sizes']>;
  defaultValues?: ItemAvailabilityType['colors'][0]['sizes'];
}) => {
  const { fields: sizeFields, replace } = useFieldArray({
    control,
    name: `colors.${sizeIndex}.sizes`
  });

  useEffect(() => {
    replace(
      sizes.map(size => {
        const defaultValue = defaultValues?.find(defaultSize => defaultSize.name === size.name);
        return defaultValue
          ? { ...size, available: defaultValue.available }
          : { ...size, available: '' };
      })
    );
  }, [replace, defaultValues, sizes]);

  return (
    <ul className="flex flex-col gap-4">
      {sizeFields.map((size, index) => {
        return (
          <li className="grid grid-cols-6 px-5" key={size.id}>
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
