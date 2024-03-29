import { type NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ShopMenImg from '../../public/images/shop-men.webp';
import ShopWomenImg from '../../public/images/shop-women.webp';
import NewArravialsImg from '../../public/images/new-arrivals.webp';
import { LargeBodyText } from '../components/typography/Typography';

const HomePage: NextPage = () => {
  return (
    <main className="flex min-h-full flex-col items-center justify-center bg-primaryBlack">
      <div className="flex h-[1600px] w-full flex-col sm:h-[960px] sm:flex-row">
        <Link href="/shop?gender=MALE" className="relative h-full cursor-pointer  sm:w-1/2">
          <LargeBodyText className="absolute right-0 z-10 m-10 text-4xl font-bold">
            MEN
          </LargeBodyText>
          <Image
            src={ShopMenImg}
            alt="Shop Men"
            className="object-cover object-top"
            sizes="(min-width: 640px) 70vw, 100vw"
            fill
            priority
          />
        </Link>
        <Link href="/shop?gender=FEMALE" className="relative h-full cursor-pointer sm:w-1/2">
          <LargeBodyText className="absolute right-0 z-10 m-10 text-4xl font-bold text-primaryWhite">
            WOMEN
          </LargeBodyText>
          <Image
            src={ShopWomenImg}
            alt="Shop Women"
            className="object-cover object-top"
            sizes="(min-width: 640px) 70vw, 100vw"
            fill
            priority
          />
        </Link>
      </div>
      <Link href="/new-arrivals" className="relative flex h-[960px] w-full">
        <LargeBodyText className="absolute left-0 z-10 m-20 text-center text-4xl font-bold text-primaryWhite">
          NEW ARRIVALS
        </LargeBodyText>
        <Image
          src={NewArravialsImg}
          alt="Shop Women"
          className="object-cover object-top "
          fill
          sizes="100vw"
        />
      </Link>
    </main>
  );
};

export default HomePage;
