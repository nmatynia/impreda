import { SVGProps } from 'react';
import {
  BsFillPersonFill,
  BsPerson,
  BsGear,
  BsBoxArrowRight,
  BsChevronDown,
  BsPencilSquare,
  BsFilterSquare,
  BsEye,
  BsCaretDown
} from 'react-icons/bs';
import { FaShoppingBag } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import clsxm from '../../utils/clsxm';
export type SvgIconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

//TODO: Optimize fonts
const iconMap = {
  Search: HiOutlineSearch,
  Cart: FaShoppingBag,
  Person: BsFillPersonFill,
  OutlinedPerson: BsPerson,
  OutlinedSettings: BsGear,
  Logout: BsBoxArrowRight,
  Edit: BsPencilSquare,
  Filter: BsFilterSquare,
  Eye: BsEye,
  CaretDown: BsCaretDown,
  ChevronDown: BsChevronDown
};

export type IconName = keyof typeof iconMap;

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export function SvgIcon({ name, className, ...props }: Props) {
  const IconComponent = iconMap[name];
  return <IconComponent className={clsxm('h-5 w-5', className)} {...props} />;
}
