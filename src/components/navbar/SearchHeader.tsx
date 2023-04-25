import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { inferProcedureOutput } from '@trpc/server/dist/core/types';
import clsxm from '../../utils/clsxm';
import { SvgIcon } from '../icons/SvgIcon';
import { trpc } from '../../utils/trpc';
import { BodyText, Bold } from '../typography/Typography';
import { NotFound } from '../not-found/NotFound';
import { ItemsRouter } from '../../server/trpc/router/_app';
import { useDebounce } from '../../utils/helpers/useDebounce';

// ?  https://github.com/jeancroy/FuzzySearch
// TODO: Add animation on search bar open

type SearchHeaderProps = {
  isOpen?: boolean;
  setIsOpen: (open: boolean) => void;
};

export const SearchHeader = ({ isOpen, setIsOpen }: SearchHeaderProps) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState<string>();
  const debouncedSearchText = useDebounce(searchText, 200);
  const isFetchingEnabled = !!debouncedSearchText && debouncedSearchText.length > 2;

  const { data: items, isFetching: isLoading } = trpc.items.getItemsByName.useQuery(
    debouncedSearchText,
    {
      enabled: isFetchingEnabled
    }
  );

  const isItemsExist = !!items && items.length > 0;

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;

      if (!ref?.current?.contains(targetElement) && targetElement.id !== 'searchButton') {
        setIsOpen(false);
      }
    };
    document.body.addEventListener('mousedown', closeDropdown);

    return () => document.body.removeEventListener('mousedown', closeDropdown);
  }, [ref, setIsOpen]);

  return (
    <div
      ref={ref}
      className={clsxm(
        'z-10 flex w-full border-t-[1px] border-primaryBlack bg-primaryWhite py-4 transition-all',
        isOpen || 'hidden'
      )}
    >
      <div className="w-full px-4 ">
        <div className="mx-auto flex w-full max-w-[62.125rem] flex-col gap-4 overflow-hidden ">
          <div className="flex items-center gap-4">
            <SvgIcon name="Search" className="h-4 w-4 " />
            <input
              type="text"
              className="flex-1 text-xs uppercase focus-within:outline-none sm:text-sm"
              placeholder="Search Products"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <SvgIcon
              name="Cross"
              className="h-4 w-4 cursor-pointer"
              onClick={() => setSearchText('')}
            />
          </div>
          <SearchBarSuggestions
            items={items}
            isItemsExist={isItemsExist}
            isLoading={isLoading}
            isFetchingEnabled={isFetchingEnabled}
          />
        </div>
      </div>
    </div>
  );
};

type Items = inferProcedureOutput<ItemsRouter['getItemsByName']> | undefined;
const SearchBarSuggestions = ({
  isLoading,
  isItemsExist,
  items,
  isFetchingEnabled
}: {
  isLoading: boolean;
  isItemsExist: boolean;
  items: Items;
  isFetchingEnabled: boolean;
}) => {
  if (isLoading)
    return (
      <div className="flex gap-4 overflow-x-auto">
        <SearchBarItemSkeleton />
        <SearchBarItemSkeleton />
        <SearchBarItemSkeleton />
        <SearchBarItemSkeleton />
        <SearchBarItemSkeleton />
      </div>
    );
  if (isItemsExist) {
    return (
      <div className="flex gap-4 overflow-x-auto">
        {items?.map(({ id, brand, name, images }) => (
          <Link
            key={id}
            href={`/item/${id}`}
            className="flex flex-col items-center gap-2 border-[1px] border-primaryBlack p-3"
          >
            <div className="relative aspect-[0.75] w-40">
              <Image src={images[0]?.url ?? ''} fill alt={name} className="object-contain" />
            </div>
            <div className="gap-1 text-center">
              <BodyText>
                <Bold>{brand}</Bold>
              </BodyText>
              <BodyText>{name}</BodyText>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  if (!isItemsExist && !isLoading && isFetchingEnabled)
    return (
      <NotFound
        title="We couldn't find any matches for your search"
        subtitle="Please try again with a different keyword or phrase."
        innerClassName="text-left items-start"
        className="m-0 max-w-max justify-start"
      />
    );

  return null;
};

const SearchBarItemSkeleton = () => (
  <div className={clsxm('h-[17.917rem] w-[11.583rem] shrink-0 animate-pulse bg-primaryBlack/20')} />
);
