import { SVGProps } from "react";
import { BsSearch, BsFillPersonFill } from "react-icons/bs";
import { FaShoppingBag, FaSearch } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
export type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

const iconMap = {
  Search: HiOutlineSearch,
  Cart: FaShoppingBag,
  Person: BsFillPersonFill,
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export function SvgIcon({ name, ...props }: Props) {
  const IconComponent = iconMap[name];
  return <IconComponent {...props} />;
}
