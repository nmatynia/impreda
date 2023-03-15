import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { Control, Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import clsxm from '../../../utils/clsxm';
import { isDark } from '../../../utils/helpers/isDark';
import { Button } from '../../button/Button';
import { Form } from '../../forms/Form';
import { InputField } from '../../forms/InputField';
import { OptionType } from '../../select/Select';
import { BodyText, Bold } from '../../typography/Typography';

export const ItemAvailabilitySchema = z
  .any
  //   {
  //   sizes: z.array(z.object({ key: z.string(), name: z.string() })),
  //   colors: z.array(z.object({ key: z.string(), name: z.string() }))
  // }
  ();

export type ItemAvailabilityType = z.infer<typeof ItemAvailabilitySchema>;

type ItemAvailabilityProps = {
  handleCloseDialog: () => void;
  onSubmit: SubmitHandler<ItemAvailabilityType>;
  sizes: OptionType[];
  colors: OptionType[];
};
// {
//   "colors": [
//     {
//         "key": "red",
//         "name": "Red",
//         "sizes": [
//             {
//                 "key": "XS",
//                 "name": "XS",
//                 "available": "123"
//             },
//             {
//                 "key": "S",
//                 "name": "S",
//                 "available": "321313"
//             }
//         ]
//     },
//     {
//         "key": "blue",
//         "name": "Blue",
//         "sizes": [
//             {
//                 "key": "XS",
//                 "name": "XS",
//                 "available": "12"
//             },
//             {
//                 "key": "S",
//                 "name": "S",
//                 "available": "131"
//             }
//         ]
//     }
// ]
// }
export const ItemAvailabilityForm = ({
  handleCloseDialog,
  onSubmit,
  sizes,
  colors
}: ItemAvailabilityProps) => {
  const methods = useForm<ItemAvailabilityType>({
    resolver: zodResolver(ItemAvailabilitySchema),
    defaultValues: {}
  });
  const {
    register,
    watch,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = methods;
  // Field Array - 1
  const {
    fields: colorFields,
    append,
    remove,
    replace
  } = useFieldArray({
    control,
    name: 'colors'
  });

  useEffect(() => {
    replace(colors);
  }, []);
  // Field Array - 2

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...methods}>
      <div className="mt-7 flex flex-col gap-8">
        {/* <InputField
          label="Price"
          placeholder={"Enter item's brand"}
          name="price"
          className="w-full"
        /> */}
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
          <Button variant="outlined" onClick={handleCloseDialog}>
            Cancel
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
  control: Control<any>;
  sizeIndex: number;
  sizes: OptionType[];
}) => {
  const {
    fields: sizeFields,
    append,
    remove,
    replace
  } = useFieldArray({
    control,
    name: `colors[${sizeIndex}].sizes`
  });

  useEffect(() => {
    replace(sizes);
  }, []);

  return (
    <ul className="flex flex-col gap-4">
      {sizeFields.map((size, index) => {
        return (
          <li className="flex gap-5 ">
            <BodyText>
              <Bold>{size.name}</Bold>
            </BodyText>
            <InputField
              name={`colors[${sizeIndex}].sizes[${index}].available`}
              placeholder="Quantity"
              className="w-full"
            />
          </li>
        );
      })}
    </ul>
  );
};
