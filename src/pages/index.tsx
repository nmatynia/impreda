import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import ShopMenImg from '../../public/images/shop-men.png';
import ShopWomenImg from '../../public/images/shop-women.png';
import { trpc } from '../utils/trpc';
import Image from 'next/image';
import { BodyText, Bold, LargeBodyText } from '../components/typography/Typography';

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: 'from tRPC' });

  //TODO: Change weight of font to medium
  return (
    <main className="flex min-h-full flex-col items-center justify-center bg-primaryBlack">
      <div className="flex h-[960px] w-full">
        <div className="relative h-full w-1/2  cursor-pointer">
          <BodyText className="absolute right-0 z-10 m-10 text-4xl font-medium">MEN</BodyText>

          <Image src={ShopMenImg} alt="Shop Men" className="object-cover object-top" fill />
        </div>
        <div className="relative h-full w-1/2 cursor-pointer">
          <BodyText className="absolute right-0 z-10 m-10 text-4xl text-primaryWhite">
            WOMEN
          </BodyText>
          <Image src={ShopWomenImg} alt="Shop Women" className="object-cover object-top" fill />
        </div>
      </div>
    </main>
  );
};

export default Home;
