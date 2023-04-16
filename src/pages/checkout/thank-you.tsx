import { GetServerSideProps } from 'next';
import { RoundedBox } from '../../components/box/RoundedBox';
import { LargeBodyText } from '../../components/typography/Typography';
import clsxm from '../../utils/clsxm';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { LinkButton } from '../../components/link/LinkButton';

import { SvgIcon } from '../../components/icons/SvgIcon';

const ThankYouPage = () => {
  // ? TODO: add to checkout page instead
  return (
    <div className={clsxm('mx-auto max-w-3xl px-4')}>
      <RoundedBox className={clsxm('relative my-16 w-full overflow-visible p-0')}>
        <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
          <LargeBodyText>Checkout</LargeBodyText>
        </div>

        <div className="m-7 flex flex-col gap-5 md:mx-14">
          <div className="my-12 flex flex-col items-center justify-center">
            <SvgIcon name="Check" className="h-8 w-8" />
            <LargeBodyText className="text-center">
              Your order was placed successfully.
              <br />
              Thank you for your purchase!
            </LargeBodyText>
          </div>
          <div className="mt-4 flex justify-start gap-3 self-end">
            <LinkButton href="/account">Go to Homepage</LinkButton>
            <LinkButton href="/admin">Go to Account</LinkButton>
          </div>
        </div>
      </RoundedBox>
    </div>
  );
};

export default ThankYouPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: '/login' }, props: {} };
  }

  return {
    props: {}
  };
};
