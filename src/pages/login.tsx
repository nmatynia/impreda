import Image from 'next/image';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RoundedBox } from '../components/box/RoundedBox';
import { BigHeading, BodyText, LargeBodyText, LogoText } from '../components/typography/Typography';
import LoginThumbnail from '../../public/images/login-thumbnail.webp';
import { Container } from '../components/container/Container';
import { Button } from '../components/button/Button';
import { Input } from '../components/input/Input';
import Tooltip from '../components/tooltip/Tooltip';

const LoginPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const { callbackUrl: callbackUrlQuery } = router.query;
  const callbackUrl = typeof callbackUrlQuery === 'string' ? callbackUrlQuery : '/';
  return (
    <Container className="h-full bg-primaryBlack px-0 md:h-fit md:bg-primaryWhite md:px-4">
      <RoundedBox className="flex w-full max-w-[1200px] bg-primaryBlack p-0 text-primaryWhite">
        <div className="flex h-full w-full flex-col gap-10 p-8 text-primaryWhite md:w-1/2 md:p-12">
          <BigHeading className="mb-10 text-center md:text-left">
            Enter world of <LogoText inheritSize>Impreda</LogoText> and shop for{' '}
            <LogoText inheritSize>beautiful</LogoText> pieces.
          </BigHeading>
          <Input placeholder="Email*" className="w-full" color="white" />
          <Input placeholder="Password*" className="w-full" type="password" color="white" />

          <div className="flex w-fit flex-col flex-wrap items-center  gap-4 sm:flex-row">
            <Tooltip
              className="w-56"
              text="Apologies, but we don't currently support this type of login. Please consider logging in with Google instead."
              alignment="left"
            >
              <Button
                variant="outlined"
                className="w-full border-primaryWhite text-primaryWhite sm:w-fit"
                disabled
              >
                Login
              </Button>
            </Tooltip>
            <BodyText>or</BodyText>
            <Button
              variant="outlined"
              className="w-full whitespace-nowrap border-primaryWhite text-primaryWhite sm:w-fit"
              onClick={() =>
                signIn('google', {
                  callbackUrl
                })
              }
            >
              Login with Google
            </Button>
          </div>
          <LargeBodyText className="text-primaryWhite">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline hover:cursor-pointer">
              Register
            </Link>{' '}
            now!
          </LargeBodyText>
        </div>
        <Image
          src={LoginThumbnail}
          className="hidden aspect-auto h-auto w-1/2 object-cover md:block"
          alt="register-thumbnail"
          height={1200}
          width={969}
          priority
        />
      </RoundedBox>
    </Container>
  );
};

export default LoginPage;
