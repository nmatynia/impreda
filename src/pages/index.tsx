import { type NextPage } from 'next';
import Link from 'next/link';
import ShopMenImg from '../../public/images/shop-men.webp';
import ShopWomenImg from '../../public/images/shop-women.webp';
import NewArravialsImg from '../../public/images/new-arrivals.webp';
// import { trpc } from '../utils/trpc';
import Image from 'next/image';
import { BodyText } from '../components/typography/Typography';

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: 'from tRPC' });

  return (
    <main className="flex min-h-full flex-col items-center justify-center bg-primaryBlack">
      <div className="flex h-[1600px] w-full flex-col sm:h-[960px] sm:flex-row">
        <div className="relative h-full cursor-pointer  sm:w-1/2">
          <Link href="/men">
            <BodyText className="absolute right-0 z-10 m-10 text-4xl font-bold">MEN</BodyText>
            <Image
              src={ShopMenImg}
              alt="Shop Men"
              className="object-cover object-top"
              fill
              priority
            />
          </Link>
        </div>
        <div className="relative h-full cursor-pointer sm:w-1/2">
          <Link href="/women">
            <BodyText className="absolute right-0 z-10 m-10 text-4xl font-bold text-primaryWhite">
              WOMEN
            </BodyText>
            <Image
              src={ShopWomenImg}
              alt="Shop Women"
              className="object-cover object-top"
              fill
              priority
            />
          </Link>
        </div>
      </div>
      <div className="relative flex h-[960px] w-full">
        <Link href="/new-arrivals">
          <BodyText className="absolute left-0 z-10 m-20 text-center text-4xl font-bold text-primaryWhite">
            NEW ARRIVALS
          </BodyText>
          <Image src={NewArravialsImg} alt="Shop Women" className="object-cover object-top " fill />
        </Link>
      </div>
    </main>
  );
};

export default Home;
