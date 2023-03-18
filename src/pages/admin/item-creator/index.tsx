import React from 'react';
import { RoundedBox } from '../../../components/box/RoundedBox';
import { LargeBodyText } from '../../../components/typography/Typography';
import { ItemDetailsType, ItemInfoForm } from '../../../components/forms/ItemInfoForm';
import { OptionType } from '../../../components/select/Select';
import { SubmitHandler } from 'react-hook-form';
import { ItemAvailabilityType } from '../../../components/item-creation-dialog/forms/ItemAvailabilityForm';
const index = () => {
  const [step, setStep] = React.useState<number>(1);
  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const brand = React.useRef<string>();
  const name = React.useRef<string>();
  const price = React.useRef<number>();
  const sex = React.useRef<string>();
  const sizes = React.useRef<OptionType[]>();
  const colors = React.useRef<OptionType[]>();
  const fabrics = React.useRef<OptionType[]>();

  const handleSubmitItemInfoForm: SubmitHandler<ItemDetailsType> = async (data, e) => {
    e?.preventDefault();
    brand.current = data.brand;
    name.current = data.name;
    price.current = Number(data.price);
    sex.current = data.sex.key;
    sizes.current = data.sizes;
    colors.current = data.colors;
    fabrics.current = data.fabrics;
    handleNextStep();
    console.log(data);
  };

  const handleSubmitItemAvailabilityForm: SubmitHandler<ItemAvailabilityType> = async (data, e) => {
    e?.preventDefault();
    console.log(data);
  };
  return (
    <div className="mx-auto max-w-3xl px-4">
      <RoundedBox className="my-16 w-full overflow-visible p-0">
        <div className="flex w-full items-center border-b-[1px] border-primaryBlack p-8">
          <LargeBodyText>Add new item</LargeBodyText>
        </div>
        <ItemInfoForm onSubmit={handleSubmitItemInfoForm} />
      </RoundedBox>
    </div>
  );
};

export default index;
