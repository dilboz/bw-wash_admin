import { AppPaths } from "@constants";
import {
  FolderSpecialIcon,
  BannerIcon,
  BrandsIcon,
  CategoryIcon,
  MachineIcon,
  UsersIcon,
  AssignmentIcon,
  AttachMoneyIcon,
  MenuIcon,
} from "@icons";
import { INavigationItem } from "@interfaces";

export const navigationList: INavigationItem[] = [
  {
    name: "Продукты",
    src: AppPaths.products,
    icon: FolderSpecialIcon,
  },
  {
    name: "Категории",
    src: AppPaths.categories,
    icon: CategoryIcon,
  },
  {
    name: "Баннеры",
    src: AppPaths.banners,
    icon: BannerIcon,
  },
  {
    name: "Бренды",
    src: AppPaths.brands,
    icon: BrandsIcon,
  },
  {
    name: "Способы доставки",
    src: AppPaths.deliveryType,
    icon: MachineIcon,
  },
  {
    name: "Характеристки",
    src: AppPaths.characteristics,
    icon: MenuIcon,
  },
  {
    name: "Способы оплаты",
    src: AppPaths.paymentTypes,
    icon: AttachMoneyIcon,
  },
  {
    name: "Заказы",
    src: AppPaths.orders,
    icon: AssignmentIcon,
  },
  {
    name: "Информация",
    src: AppPaths.info,
    icon: AssignmentIcon,
  },
];
