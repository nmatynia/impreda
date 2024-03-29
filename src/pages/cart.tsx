import { GetServerSideProps } from 'next';
import { RoundedBox } from '../components/box/RoundedBox';
import { Bold, LargeBodyText, SmallBodyText } from '../components/typography/Typography';
import clsxm from '../utils/clsxm';
import { getServerAuthSession } from '../server/common/get-server-auth-session';
import { trpc } from '../utils/trpc';
import { CartItem } from '../components/navbar/header/cart/CartItem';
import { SvgIcon } from '../components/icons/SvgIcon';
import { NotFound } from '../components/not-found/NotFound';
import { LinkButton } from '../components/link/LinkButton';

const CartPage = () => {
  const utils = trpc.useContext();
  const { data: cart } = trpc.cart.getCart.useQuery();
  const { items: cartItems } = cart || {};
  const { mutateAsync: removeCart, isLoading: isDeleting } = trpc.cart.removeCart.useMutation({
    onSuccess: () => {
      utils.cart.invalidate();
    }
  });
  const handleDeleteCart = () => {
    removeCart();
  };

  const total =
    cartItems?.reduce((acc, cartItem) => acc + cartItem.item.price * cartItem.quantity, 0) ?? 0;
  const isCartNotEmpty = cartItems && cartItems.length > 0;
  return (
    <div className={clsxm('mx-auto max-w-3xl px-4')}>
      <RoundedBox className={clsxm('relative my-16 w-full overflow-visible p-0')}>
        <div className="flex w-full items-center justify-between border-b-[1px] border-primaryBlack p-8">
          <LargeBodyText>You have {cartItems?.length ?? 0} items in your cart</LargeBodyText>
          {cart && (
            <button type="button" onClick={handleDeleteCart}>
              {isDeleting ? (
                <LargeBodyText>Deleting...</LargeBodyText>
              ) : (
                <SvgIcon name="Trash" className="ml-3 h-4 w-4" />
              )}
            </button>
          )}
        </div>
        <div className="m-7 mb-0 flex flex-col">
          {isCartNotEmpty ? (
            cartItems?.map(cartItem => (
              <CartItem
                key={cartItem.id}
                id={cartItem.id}
                itemId={cartItem.item.id}
                brand={cartItem.item.brand}
                name={cartItem.item.name}
                price={cartItem.item.price * cartItem.quantity}
                quantity={cartItem.quantity}
                src={cartItem.item.images[0]?.url ?? ''}
                size={cartItem.size.name}
                color={cartItem.color.name}
                className="border-b-[1px] border-primaryBlack py-4 first:pt-0 "
              />
            ))
          ) : (
            <NotFound
              title="It seems your shopping cart is empty at the moment."
              subtitle="Visit our shopping page to explore our amazing item selection and fill your cart with your desired items"
            />
          )}
          <div className="sticky bottom-0 flex items-center justify-between bg-primaryWhite pt-8 pb-7">
            <div className="flex flex-col gap-1">
              <LargeBodyText />
              <Bold>Total: £{total}</Bold> <SmallBodyText>+ shipping</SmallBodyText>
            </div>
            <LinkButton
              variant={isCartNotEmpty ? 'primary' : 'outlined'}
              href={isCartNotEmpty ? '/checkout' : ''}
              className={isCartNotEmpty ? '' : 'cursor-not-allowed'}
            >
              Checkout
            </LinkButton>
          </div>
        </div>
      </RoundedBox>
    </div>
  );
};

export default CartPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return { redirect: { destination: '/login?callbackUrl=/cart' }, props: {} };
  }

  return {
    props: {}
  };
};
