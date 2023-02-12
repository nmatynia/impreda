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
    <Container className="px-4">
      <RoundedBox className="flex w-full max-w-[1200px] bg-primaryBlack p-0 text-primaryWhite">
        <Image
          src={RegisterThumbnail.src}
          className="hidden aspect-auto h-auto w-1/2 md:block"
          alt="register-thumbnail"
          height={1200}
          width={969}
        />
        <div className="flex h-full w-full flex-col gap-10 p-12 text-primaryWhite md:w-1/2">
          <BigHeading>
            Join <LogoText inheritSize>Impreda</LogoText>where your fashion is
          </BigHeading>
          <div className="flex w-full gap-4">
            <Input placeholder="First name*" />
            <Input placeholder="Last name*" />
          </div>
          <Input placeholder="Email*" />
          <Input placeholder="Password*" password />
          <div className="flex flex-col">
            <Checkbox label="I agree with the terms and conditions.*" />
            <Checkbox label="Subscribe for fashion updates & exclusive offers" />
          </div>
          <Button variant={'outlined'} className="border-primaryWhite text-primaryWhite">
            Register
          </Button>
        </div>
      </RoundedBox>
    </Container>
  );
};

export default register;
