import { Link, Page, SubcategoriesMenu, ToggleButton } from "@components";
import { AppPaths, ErrorPaths } from "@constants";
import { categoryControllers } from "@controllers";
import { ICategory } from "@interfaces";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { BaseUrlWithoutApi } from "@utils/BaseUrl";
import { history } from "@utils/history";
import classNames from "classnames";
import React from "react";
import { useParams } from "react-router-dom";

export const EditCategory: React.FC = (): JSX.Element => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { data, popularData, pending } = useAppSelector(
    (state) => state.category
  );

  const [canDelete, setCanDelete] = React.useState<boolean>(true);

  const [currentCategoryId, setCurrentCategoryId] = React.useState<string | null>(null);
  const [subcategoryId, setSubCategoryId] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>("");
  const [popular, setPopular] = React.useState<boolean>(false);
  const [wrapData, setWrapData] = React.useState<any[]>([]);
  const [icon, setIcon] = React.useState<File | null>(null);
  const [image, setImage] = React.useState<File | null>(null);
  const [iconPath, setIconPath] = React.useState<string | null>(null);
  const [imagePath, setImagePath] = React.useState<string | null>(null);

  const handleSelectIcon = React.useCallback((files: FileList | null) => {
    if (!files) return;
    setIconPath(URL.createObjectURL(files[0]));
    setIcon(files[0]);
  }, []);

  const handleSelectImage = React.useCallback((files: FileList | null) => {
    if (!files) return;
    setImagePath(URL.createObjectURL(files[0]));
    setImage(files[0]);
  }, []);

  const handleEditCategory = React.useCallback((): void => {
    if (!id) return;
    const formData = new FormData();

    formData.append("name", name);
    formData.append("isPopular", popular ? "true" : "false");
    if (image) formData.append("image", image);
    if (icon) formData.append("icon", icon);
    if (subcategoryId) formData.append("parentCategoryId", subcategoryId);

    dispatch(categoryControllers.edit(formData, id));
  }, [dispatch, name, popular, subcategoryId, image, icon, id]);

  const handleRemoveCategory = React.useCallback((): void => {
    if (!id) return;
    dispatch(categoryControllers.delete(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    dispatch(categoryControllers.get());
    dispatch(categoryControllers.getPopular());
  }, [dispatch]);

  React.useEffect(() => {
    if (!data.length) return;
    setWrapData([{ id: null, name: "Корневая категория" }, ...data]);
  }, [data]);

  React.useEffect(() => {
    if (!pending || !data.length) return;
    let ok = false;
    const initCategory = (parentId: string | null, item: ICategory) => {
      setCurrentCategoryId(item.id)
      setName(item.name);
      setPopular(popularData.find((i) => i.id === item.id) ? true : false);
      setSubCategoryId(parentId);
      if (item.subCategories.length > 0) setCanDelete(false);
      if (item.iconPath) setIconPath(BaseUrlWithoutApi + item.iconPath);
      if (item.imagePath) setImagePath(BaseUrlWithoutApi + item.imagePath);
    };
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        initCategory(null, data[i]);
        ok = true;
        break;
      } else {
        for (let j = 0; j < data[i].subCategories.length; j++)
          if (data[i].subCategories[j].id === id) {
            initCategory(data[i].id, data[i].subCategories[j]);
            ok = true;
            break;
          } else {
            for (
              let k = 0;
              k < data[i].subCategories[j].subCategories.length;
              k++
            )
              if (data[i].subCategories[j].subCategories[k].id === id) {
                initCategory(
                  data[i].subCategories[j].id,
                  data[i].subCategories[j].subCategories[k]
                );
                ok = true;
                break;
              }
          }
      }
    }
    if (!ok) history.push(ErrorPaths.notFound);
  }, [id, data, popularData, pending]);

  return (
    <Page title="Изменить категорию">
      <MainLayout>
        <div className="add-characteristics">
          <h1 className="title mb-3">Изменить категорию</h1>
          <div className="deliveryType__add-new mb-3">
            <div className="deliveryType__add-new-label">
              {subcategoryId && <p>Подкатегория для:</p>}
              <SubcategoriesMenu
                id="1"
                currentId={currentCategoryId}
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
            {(icon || iconPath) && (
              <div className="margin-center deliveryType__add-new-label banner__image banner__image_xs">
                <img
                  className="img"
                  src={
                    icon ? URL.createObjectURL(icon) : iconPath ? iconPath : ""
                  }
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
            {(image || imagePath) && (
              <div className="margin-center deliveryType__add-new-label banner__image banner__image_sm">
                <img
                  className="img"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : imagePath
                      ? imagePath
                      : ""
                  }
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
              onClick={handleEditCategory}
            >
              Изменить
            </button>
            {canDelete && (
              <button
                disabled={pending}
                className={classNames(
                  "deliveryType__add-new-btn deliveryType__add-new-btn_remove",
                  pending && "deliveryType__add-new-btn_pending"
                )}
                onClick={handleRemoveCategory}
              >
                Удалить категорию
              </button>
            )}
            <Link
              to={AppPaths.categories}
              className="deliveryType__add-new-btn-cancel"
            >
              Отмена
            </Link>
          </div>
        </div>
      </MainLayout>
    </Page>
  );
};
