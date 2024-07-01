import React, { useState } from "react";
import { DropdownMenu, Page, SubSubcategoriesMenu } from "@components";
import { MainLayout } from "@layouts";
import { ICategory, ISelectedCharacteristic } from "@interfaces";
import { useAppDispatch, useAppSelector } from "@store";
import { CharacteristicsDropdown } from "@components";
import {
  brandControllers,
  categoryControllers,
  characteristicControllers,
  productControllers,
} from "@controllers";
import { DeleteIcon, LinkIcon } from "@icons";
import { addProductValidation } from "@validations";
import classNames from "classnames";

interface IFile {
  id: string;
  file: File;
}

export const AddProduct: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { pending } = useAppSelector((state) => state.product);
  const categories = useAppSelector((state) => state.category);
  const brands = useAppSelector((state) => state.brand);
  const [imageCount, setImageCount] = useState(5);

  const [errorText, setErrorText] = React.useState<string | null>("");
  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("0");
  const [discount, setDiscount] = React.useState<string>("0");
  const [vendorcode, setVendorcode] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [categoryId, setCategoryId] = React.useState<string | null>(null);
  const [brand, setBrand] = React.useState<{ id: string; name: string } | null>(
    null
  );
  const [characteristicsValues, setCharacteristicsValues] = React.useState<
    ISelectedCharacteristic[]
  >([]);
  const [mainImage, setMainImage] = React.useState<File | null>(null);
  const [imageList, setImageList] = React.useState<IFile[]>([]);

  const handleAddProduct = React.useCallback(() => {
    const validationResult = addProductValidation({
      name,
      price,
      vendorcode,
      categoryId,
      mainImage,
    });

    setErrorText(validationResult.errorText || null);
    if (!validationResult.isValid) return;

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Price", String(price));
    formData.append("Discount", String(discount));
    formData.append("Vendorcode", vendorcode);
    formData.append("Description", description);
    formData.append("CategoryId", categoryId || "");
    formData.append("BrandId", brand?.id || "");
    formData.append("MainImage", mainImage || "");
    imageList.forEach((image) => {
      formData.append("Images", image.file == undefined ? "" : image?.file);
    });
    characteristicsValues
      .filter((item) => item.characteristic.id !== "" && item.value.id !== "")
      .forEach((item) => {
        formData.append("CharacteristicValueId", item.value.id);
      });

    dispatch(productControllers.create(formData));
  }, [
    brand?.id,
    categoryId,
    characteristicsValues,
    description,
    discount,
    dispatch,
    imageList,
    mainImage,
    name,
    price,
    vendorcode,
  ]);

  const handleSelectMainImg = React.useCallback((files: FileList | null) => {
    if (!files) return;
    setMainImage(files[0]);
  }, []);

  const handleAddImage = (files: FileList | null, index: number) => {
    if (!files) return;
    const newArray: any = [...imageList];

    newArray[index] = { file: files[0], id: String(new Date().valueOf()) };

    setImageList(newArray);
  };

  const handleRemoveImage = (index: number) => {
    let allImages: any = [...imageList];
    allImages[index] = undefined;

    setImageList(allImages);
  };

  React.useEffect(() => {
    dispatch(categoryControllers.get());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(brandControllers.get());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(characteristicControllers.getWithValues());
  }, [dispatch]);

  return (
    <Page title="Добавить продукт">
      <MainLayout>
        <h1 className="title mb-3">Добавить продукт</h1>

        <div className="form characteristics-form">
          <div className="form__label">
            <div className="form__label-name">
              Главная картинка
              <span className="exact_star">*</span>
            </div>
            {mainImage && (
              <div className="banner__container mt-1">
                <div className="banner__image">
                  <img
                    className="img main-product-image"
                    src={URL.createObjectURL(mainImage)}
                    alt="Выбранное изображение"
                  />
                </div>
                <div className="banner__tools">
                  <button
                    className="banner__btn banner__delete-btn"
                    onClick={() => setMainImage(null)}
                  >
                    <DeleteIcon size={24} />
                  </button>
                </div>
              </div>
            )}
            {!mainImage && (
              <label className="add-btn add-btn_sm">
                <input
                  id="inputfile"
                  className="d-none"
                  type="file"
                  onChange={(e) => handleSelectMainImg(e.target.files)}
                />
                Выбрать главную фотографию
              </label>
            )}
          </div>

          <div className="form__label">
            <div className="form__label-name">Дополнительные фотографии</div>

            <div className="d-flex gap-20 mt-1 mb-1 flex-wrap">
              {Array.from({ length: imageCount }, (_, index: number) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #e5e5e5",
                    padding: "2px",
                    height: "100px",
                    width: "100px",
                    borderRadius: "10px",
                    color: "#d5d5d5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                  onClick={() =>
                    document.getElementById("input-file-" + index)?.click()
                  }
                >
                  {imageList[index]?.file === undefined && (
                    <LinkIcon size={24} />
                  )}
                  {imageList[index]?.file !== undefined && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                      style={{
                        background: "white",
                        position: "absolute",
                        color: "red",
                        top: "-5px",
                        right: "-10px",
                        cursor: "pointer",
                        padding: "5px",
                        borderRadius: "100%",
                        border: "1px solid #e5e5e5",
                      }}
                    >
                      <DeleteIcon size={24} />
                    </div>
                  )}
                  {imageList[index]?.file !== undefined && (
                    <img
                      src={URL.createObjectURL(imageList[index]?.file)}
                      alt=""
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                  <input
                    id={"input-file-" + index}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleAddImage(e.target.files, index)}
                  />
                </div>
              ))}
              <div
                style={{
                  border: "1px solid #e5e5e5",
                  padding: "2px",
                  height: "100px",
                  width: "100px",
                  borderRadius: "10px",
                  color: "#d5d5d5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                onClick={() => setImageCount((prev: number) => prev + 1)}
              >
                +
              </div>
            </div>
          </div>

          <div className="form__label">
            <div className="form__label-name">
              Название
              <span className="exact_star">*</span>
            </div>

            <div className="form__label-input">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form__label">
            <div className="form__label-name">
              Цена
              <span className="exact_star">*</span>
            </div>

            <div className="form__label-input">
              <input
                type="text"
                value={price}
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={(e) => {
                  let value = e.target.value;
                  if (!isNaN(Number(value))) setPrice(e.target.value);
                }}
              />
              <div className="form__label-input-type">c.</div>
            </div>
          </div>

          <div className="form__label">
            <div className="form__label-name">Акция</div>

            <div className="form__label-input">
              <input
                type="text"
                value={discount}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  let value = e.target.value.replace(",", "");
                  if (value.indexOf(",") !== -1) return;
                  if (!isNaN(Number(value))) setDiscount(e.target.value);
                }}
              />
              <div className="form__label-input-type">%</div>
            </div>
          </div>

          <div className="form__label">
            <div className="form__label-name">
              Vendor Code
              <span className="exact_star">*</span>
            </div>

            <div className="form__label-input">
              <input
                type="text"
                value={vendorcode}
                onChange={(e) => setVendorcode(e.target.value)}
              />
            </div>
          </div>

          <div className="form__label">
            <div className="form__label-name">
              Категория
              <span className="exact_star">*</span>
            </div>
            <SubSubcategoriesMenu
              id="categoryId"
              selectedId={categoryId}
              onSelect={(id) => setCategoryId(id)}
              list={(categories?.data as any)?.toReversed()}
            />
          </div>

          <div className="form__label">
            <div className="form__label-name">Бренд</div>
            <DropdownMenu
              id="categoryId"
              value={brand?.name || ""}
              onSelect={(name, id?) => setBrand({ id: id || "", name })}
              list={brands.data}
            />
          </div>

          <div className="form__label">
            <div className="form__label-name mb-1">Характеристки</div>
            <CharacteristicsDropdown
              characteristicsValues={characteristicsValues}
              setCharacteristicsValues={setCharacteristicsValues}
            />
          </div>

          <div className="form__label">
            <div className="form__label-name">Описание</div>

            <div className="form__label-input form__label-textarea">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={pending}
            className={classNames(
              "deliveryType__add-new-btn",
              pending && "deliveryType__add-new-btn_pending"
            )}
            onClick={handleAddProduct}
          >
            Добавить продукт
          </button>

          {errorText && <div className="error-text mt-1">{errorText}</div>}
        </div>
      </MainLayout>
    </Page>
  );
};
