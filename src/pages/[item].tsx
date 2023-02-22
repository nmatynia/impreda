import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '../components/container/Container';

const Item = () => {
  const router = useRouter();
  const { item } = router.query;
  //TODO fetch item data based on item id
  return (
    <Container fullSize>
      <div className="flex h-fit w-full flex-col sm:flex-row">
        <div className="h-fit w-full bg-blue-300 sm:w-1/2">
          <div className="h-screenWithoutHeader"></div>
        </div>
        <div className="h-screenWithoutHeader w-full bg-red-400 sm:w-1/2">{item}</div>
      </div>
    </Container>
  );
};

export default Item;
