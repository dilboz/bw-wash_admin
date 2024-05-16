import React from "react";
import { Page, SubcategoriesMenu, ToggleButton } from "@components";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { categoryControllers } from "@controllers";
import classNames from "classnames";

export const AddCategory: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { data, pending } = useAppSelector((state) => state.category);

  const [subcategoryId, setSubCategoryId] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>("");
  const [popular, setPopular] = React.useState<boolean>(false);
  const [wrapData, setWrapData] = React.useState<any[]>([]);
  const [icon, setIcon] = React.useState<File | null>(null);
  const [image, setImage] = React.useState<File | null>(null);

  const handleSelectIcon = React.useCallback((files: FileList | null) => {
    if (!files) return;
    setIcon(files[0]);
  }, []);

  const handleSelectImage = React.useCallback((files: FileList | null) => {
    if (!files) return;
    setImage(files[0]);
  }, []);

  const handleAddCategory = React.useCallback((): void => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("isPopular", popular ? "true" : "false");
    if (image) formData.append("image", image);
    if (icon) formData.append("icon", icon);
    if (subcategoryId) formData.append("parentCategoryId", subcategoryId);

    dispatch(categoryControllers.create(formData));
  }, [dispatch, name, popular, subcategoryId, image, icon]);

  React.useEffect(() => {
    dispatch(categoryControllers.get());
  }, [dispatch]);

  React.useEffect(() => {
    setWrapData([{ id: null, name: "Корневая категория" }, ...data]);
  }, [data]);

  return (
    <Page title="Добавить категорию">
      <MainLayout>
        <div className="add-characteristics">
          <h1 className="title mb-3">Добавить категорию</h1>
          <div className="deliveryType__add-new mb-3">
            <div className="deliveryType__add-new-label">
              {subcategoryId && <p>Подкатегория для:</p>}
              <SubcategoriesMenu
                id="1"
                selectedId={subcategoryId}
                onSelect={(id) => setSubCategoryId(id)}
                list={wrapData}
              />
            </div>
            <div className="deliveryType__add-new-label">
              <p>Название категории</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="deliveryType__add-new-input"
              />
            </div>
            <div className="deliveryType__add-new-label">
              <label className="add-btn">
                <input
                  id="inputfile"
                  onChange={(e) => handleSelectIcon(e.target.files)}
                  type="file"
                  className="d-none"
                />
                Выбрать Иконку
              </label>
            </div>
            {icon && (
              <div className="margin-center deliveryType__add-new-label banner__image banner__image_sm">
                <img
                  className="img"
                  src={URL.createObjectURL(icon)}
                  alt="Выбранное изображение"
                />
              </div>
            )}
            <div className="deliveryType__add-new-label">
              <label className="add-btn">
                <input
                  id="inputfile"
                  onChange={(e) => handleSelectImage(e.target.files)}
                  type="file"
                  className="d-none"
                />
                Выбрать фотографию категории
              </label>
            </div>
            {image && (
              <div className="margin-center deliveryType__add-new-label banner__image banner__image_xs">
                <img
                  className="img"
                  src={URL.createObjectURL(image)}
                  alt="Выбранное изображение"
                />
              </div>
            )}
            <div className="deliveryType__add-new-label">
              <p>Популярная категория</p>
              <ToggleButton
                checked={popular}
                onToggle={(v: boolean) => setPopular(v)}
              />
            </div>
            <button
              disabled={pending}
              className={classNames(
                "deliveryType__add-new-btn",
                pending && "deliveryType__add-new-btn_pending"
              )}
              onClick={handleAddCategory}
            >
              Добавить
            </button>
          </div>
        </div>
      </MainLayout>
    </Page>
  );
};
