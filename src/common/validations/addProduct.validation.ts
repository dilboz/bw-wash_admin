interface IProps {
  name: string;
  price: string;
  vendorcode: string;
  categoryId: string | null;
  mainImage: File | string | null;
}

export const addProductValidation = (props: IProps) => {
  if (
    (typeof props.mainImage === "string" && props.mainImage?.trim() === "") ||
    !props.mainImage
  )
    return {
      errorText: "Продукт должен иметь главную картинку",
      isValid: false,
    };
  if (props.name.trim() === "")
    return { errorText: "Введите название продукта", isValid: false };
  if (props.price === "0")
    return { errorText: "Цена продукта не равняться нулю", isValid: false };
  if (props.vendorcode.trim() === "0")
    return { errorText: "Код обязателен", isValid: false };
  if (!props.categoryId || props.categoryId?.trim() === "")
    return { errorText: "Выберите категорию продукта", isValid: false };

  return { isValid: true };
};
