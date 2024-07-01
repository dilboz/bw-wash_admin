import React, { useState } from "react";
import { DropdownMenu, Page, SubSubcategoriesMenu } from "@components";
import { MainLayout } from "@layouts";
import { ICharacteristicValue, ISelectedCharacteristic } from "@interfaces";
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
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { BaseUrlWithoutApi } from "@utils/BaseUrl";

interface IFile {
  id: string;
  file: File | null;
  image: string;
}

export const EditProduct: React.FC = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [imageCount, setImageCount] = useState(5);

  const { pending, dataById } = useAppSelector((state) => state.product);
  const categories = useAppSelector((state) => state.category);
  const brands = useAppSelector((state) => state.brand);
  const characteristics = useAppSelector((state) => state.characteristic);

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
  const [mainImage, setMainImage] = React.useState<IFile | null>(null);
  const [imageList, setImageList] = React.useState<IFile[]>([]);

  const handleCompareImages: any = React.useCallback(() => {
    if (!mainImage || !dataById) return;
    const deletedImagesId: string[] = [];
    const newImages: File[] = [];
    let newMainImage: File | null = null;

    dataById.images.forEach((image) => {
      if (!imageList.find((img) => img.id === image.id) && !image.isMain) {
        deletedImagesId.push(image.id);
      }
      if (image.isMain && image.id !== mainImage.id) {
        newMainImage = mainImage.file;
        deletedImagesId.push(image.id);
      }
    });

    imageList.forEach((image) => {
      if (!dataById.images.find((img) => img.id === image.id)) {
        newImages.push(image.file as File);
      }
    });

    return {
      deletedImagesId,
      newImages,
      newMainImage,
    };
  }, [dataById, imageList, mainImage]);

  const handleCompareCharacteristics: any = React.useCallback(() => {
    if (!dataById) return;
    const deletedCharacteristics: string[] = [];
    const newCharacteristicsValueId: string[] = [];

    dataById.characteristics.forEach((characteristic) => {
      if (!characteristicsValues.find((ch) => ch.id === characteristic.id)) {
        deletedCharacteristics.push(characteristic.id);
      }
    });

    characteristicsValues.forEach((characteristic) => {
      if (
        !dataById.characteristics.find((ch) => ch.id === characteristic.id) &&
        characteristic.value.value.trim() !== ""
      ) {
        newCharacteristicsValueId.push(characteristic.value.id);
      }
    });

    return {
      deletedCharacteristics,
      newCharacteristicsValueId,
    };
  }, [dataById, characteristicsValues]);

  const handleAddProduct = React.useCallback(() => {
    const validationResult = addProductValidation({
      name,
      price,
      vendorcode,
      categoryId,
      mainImage: mainImage?.image || null,
    });

    setErrorText(validationResult.errorText || null);
    if (!validationResult.isValid || !id) return;

    const { deletedImagesId, newImages, newMainImage } = handleCompareImages();

    const { deletedCharacteristics, newCharacteristicsValueId } =
      handleCompareCharacteristics();

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Price", String(price));
    formData.append("Discount", String(discount));
    formData.append("Vendorcode", vendorcode);
    formData.append("Description", description);
    formData.append("CategoryId", categoryId || "");
    formData.append("BrandId", brand?.id || "");
    if (newMainImage) formData.append("MainImage", mainImage?.file || "");
    if (newImages.length)
      newImages.forEach((image: File) => {
        formData.append("Images", image);
      });
    if (deletedImagesId.length)
      deletedImagesId.forEach((image: File) => {
        formData.append("DeleteImageIds", image);
      });
    if (newCharacteristicsValueId.length)
      newCharacteristicsValueId.forEach((chValueId: string) => {
        formData.append("CharacteristicValueId", chValueId);
      });
    if (deletedCharacteristics.length)
      deletedCharacteristics.forEach((chId: string) => {
        formData.append("DeleteCharacteristicValueIds", chId);
      });

    dispatch(productControllers.edit(formData, id));
  }, [
    name,
    price,
    vendorcode,
    categoryId,
    mainImage?.image,
    mainImage?.file,
    id,
    handleCompareImages,
    handleCompareCharacteristics,
    discount,
    description,
    brand?.id,
    dispatch,
  ]);

  const handleSelectMainImg = React.useCallback((files: FileList | null) => {
    if (!files) return;
    setMainImage({
      id: String(new Date().valueOf()),
      file: files[0],
      image: URL.createObjectURL(files[0]),
    });
  }, []);

  const handleAddImage = (files: FileList | null, index: number) => {
    if (!files) return;
    const newArray: any = [...imageList];

    newArray[index] = {
      file: files[0],
      id: String(new Date().valueOf()),
      image: URL.createObjectURL(files[0]),
    };

    setImageList(newArray);
  };

  const handleRemoveImage = (index: number) => {
    let allImages: any = [...imageList];
    const removedImage = allImages[index];

    allImages[index] = {...removedImage, file: undefined};

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

  React.useEffect(() => {
    if (!id) return;
    dispatch(productControllers.getById(id));
  }, [id, dispatch]);

  React.useEffect(() => {
    if (!dataById) return;
    setName(dataById.name);
    setPrice(dataById.price);
    setDescription(dataById.description);
    setVendorcode(dataById.vendorCode);
    setBrand({
      id: dataById.brandId,
      name:
        brands.data.find((item) => item.id === dataById.brandId)?.name || "",
    });
    setCategoryId(dataById.categoryId);
    setDiscount(dataById.discount);
    setCharacteristicsValues(
      dataById.characteristics.map((item) => ({
        id: item.id,
        characteristic: {
          id:
            characteristics.dataWithValue.find(
              (characteristic) => characteristic.name === item.name
            )?.id || "",
          name: item.name,
        },
        value: {
          id:
            characteristics.dataWithValue
              .find((characteristic) => characteristic.name === item.name)
              ?.values.find(
                (value: Omit<ICharacteristicValue, "characteristicId">) =>
                  value.value === item.value
              )?.id || "",
          value: item.value,
        },
      }))
    );

    setImageList(
      dataById.images
        ?.filter((item) => !item.isMain)
        ?.map((item) => ({
          id: item.id,
          image: BaseUrlWithoutApi + item.imagePath,
          file: null,
        }))
    );

    setImageCount(dataById?.images?.length - 1)

    const payloadMainImage = dataById.images?.find((item) => item.isMain);
    if (payloadMainImage)
      setMainImage({
        id: payloadMainImage.id,
        image: BaseUrlWithoutApi + payloadMainImage.imagePath,
        file: null,
      });
  }, [dataById, characteristics, brands.data]);

  return (
    <Page title="Изменить продукт">
      <MainLayout>
        <h1 className="title mb-3">Изменить продукт</h1>

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
                    src={mainImage.image}
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

            <div className="d-flex flex-wrap gap-20 mt-1 mb-1">
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
                      src={imageList[index]?.image}
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
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  const value = e.target.value;
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
                  const value = e.target.value;
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
            Изменить продукт
          </button>

          {errorText && <div className="error-text mt-1">{errorText}</div>}
        </div>
      </MainLayout>
    </Page>
  );
};
