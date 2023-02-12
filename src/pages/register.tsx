import Image from 'next/image';
import React from 'react';
import RoundedBox from '../components/box/RoundedBox';
import { BigHeading, LogoText } from '../components/typography/Typography';
import RegisterThumbnail from '../../public/images/register-thumbnail.webp';
import { Container } from '../components/container/Container';
import Button from '../components/button/Button';
import { Input } from '../components/input/Input';
import { Checkbox } from '../components/checkbox/Checkbox';

//TODO - use form library
const register = () => {
  return (
    <Container className="h-full bg-primaryBlack px-0 md:h-fit md:bg-primaryWhite md:px-4">
      <RoundedBox className="flex w-full max-w-[1200px] bg-primaryBlack p-0 text-primaryWhite">
        <Image
          src={RegisterThumbnail.src}
          className="hidden aspect-auto h-auto w-1/2 object-cover md:block"
          alt="register-thumbnail"
          height={1200}
          width={969}
        />
        <div className="flex h-full w-full flex-col gap-10 p-8 text-primaryWhite md:w-1/2 md:p-12">
          <BigHeading className="mb-10 text-center md:text-left">
            Join <LogoText inheritSize>Impreda</LogoText> and discover a world of{' '}
            <LogoText inheritSize>fashion</LogoText>.
          </BigHeading>
          <div className="flex w-full flex-col gap-x-4 gap-y-10 sm:flex-row">
            <Input placeholder="First name*" className="w-full sm:w-1/2" />
            <Input placeholder="Last name*" className="w-full sm:w-1/2" />
          </div>
          <Input placeholder="Email*" className="w-full" />
          <Input placeholder="Password*" className="w-full" password />
          <div className="flex flex-col">
            <Checkbox label="I agree with the terms and conditions.*" />
            <Checkbox label="Subscribe for fashion updates & exclusive offers" />
          </div>
          <Button
            variant={'outlined'}
            className="w-full border-primaryWhite text-primaryWhite sm:w-fit"
          >
            Register
          </Button>
        </div>
      </RoundedBox>
    </Container>
  );
};

export default register;