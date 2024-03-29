import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { RoundedBox } from '../components/box/RoundedBox';
import { BigHeading, BodyText, LogoText } from '../components/typography/Typography';
import RegisterThumbnail from '../../public/images/register-thumbnail.webp';
import { Container } from '../components/container/Container';
import { Button } from '../components/button/Button';
import { Input } from '../components/input/Input';
import { Checkbox } from '../components/checkbox/Checkbox';
import Tooltip from '../components/tooltip/Tooltip';

const RegisterPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  return (
    <Container className="h-full bg-primaryBlack px-0 md:h-fit md:bg-primaryWhite md:px-4">
      <RoundedBox className="flex w-full max-w-[1200px] bg-primaryBlack p-0 text-primaryWhite">
        <Image
          src={RegisterThumbnail}
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
            <Tooltip
              className="w-56"
              text="Apologies, but we don't currently support this type of registration. Please consider signing up with Google instead."
              alignment="left"
            >
              <Button
                variant="outlined"
                className="w-full border-primaryWhite text-primaryWhite sm:w-fit"
                disabled
              >
                Register
              </Button>
            </Tooltip>
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

export default RegisterPage;
