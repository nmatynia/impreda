import Image from 'next/image';
import React from 'react';
import { signIn } from 'next-auth/react';
import type { GetServerSideProps } from 'next';
import { RoundedBox } from '../components/box/RoundedBox';
import { BigHeading, BodyText, LogoText } from '../components/typography/Typography';
import RegisterThumbnail from '../../public/images/register-thumbnail.webp';
import { Container } from '../components/container/Container';
import { Button } from '../components/button/Button';
import { Input } from '../components/input/Input';
import { Checkbox } from '../components/checkbox/Checkbox';
import { getServerAuthSession } from '../server/common/get-server-auth-session';

// TODO - use form library
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
          priority
        />
        <div className="flex h-full w-full flex-col gap-10 p-8 text-primaryWhite md:w-1/2 md:p-12">
          <BigHeading className="mb-10 text-center md:text-left">
            Join <LogoText inheritSize>Impreda</LogoText> and discover a world of{' '}
            <LogoText inheritSize>fashion</LogoText>.
          </BigHeading>
          <div className="flex w-full flex-col gap-x-4 gap-y-10 sm:flex-row">
            <Input placeholder="First name*" className="w-full sm:w-1/2" color="white" />
            <Input placeholder="Last name*" className="w-full sm:w-1/2" color="white" />
          </div>
          <Input placeholder="Email*" className="w-full" color="white" />
          <Input placeholder="Password*" className="w-full" type="password" color="white" />
          <div className="flex flex-col">
            <Checkbox label="I agree with the terms and conditions.*" />
            <Checkbox label="Subscribe for fashion updates & exclusive offers" />
          </div>
          <div className="flex w-fit flex-col flex-wrap items-center  gap-4 sm:flex-row">
            <Button
              variant="outlined"
              className="w-full border-primaryWhite text-primaryWhite sm:w-fit"
            >
              Register
            </Button>
            <BodyText>or</BodyText>
            <Button
              variant="outlined"
              className="w-full whitespace-nowrap border-primaryWhite text-primaryWhite sm:w-fit"
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/'
                })
              }
            >
              Register with Google
            </Button>
          </div>
        </div>
      </RoundedBox>
    </Container>
  );
};

export default register;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);
  if (session) {
    return { redirect: { destination: '/' }, props: {} };
  }

  return {
    props: {}
  };
};
