import React from "react";
import { Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { brandControllers } from "@controllers";
import { AppPaths } from "@constants";
import classNames from "classnames";

export const AddBrand: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pending } = useAppSelector((state) => state.brand);

  const [name, setName] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);

  const handleSelectImg = React.useCallback((files: FileList | null) => {
    if (!files) return;
    setFile(files[0]);
  }, []);

  const handleCreateBrand = React.useCallback(() => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    dispatch(brandControllers.create(formData));
  }, [file, name, dispatch]);

  return (
    <Page title="Добавить бренд">
      <MainLayout>
        <div className="add-characteristics">
          <h1 className="title mb-3">Добавить бренд</h1>
          <div className="deliveryType__add-new mb-3">
            <div className="d-flex direction-column gap-20">
              <div className="deliveryType__add-new-label">
                <label className="add-btn">
                  <input
                    id="inputfile"
                    onChange={(e) => handleSelectImg(e.target.files)}
                    type="file"
                    className="d-none"
                  />
                  Выбрать фотографию
                </label>
              </div>
              {file && (
                <div className="margin-center deliveryType__add-new-label banner__image banner__image_sm">
                  <img
                    className="img"
                    src={URL.createObjectURL(file)}
                    alt="Выбранное изображение"
                  />
                </div>
              )}
              <div className="deliveryType__add-new-label">
                <p>Название бренда</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="deliveryType__add-new-input"
                />
              </div>
            </div>
            <button
              disabled={pending}
              className={classNames(
                "deliveryType__add-new-btn",
                pending && "deliveryType__add-new-btn_pending"
              )}
              onClick={handleCreateBrand}
            >
              Добавить
            </button>
            <Link
              to={AppPaths.brands}
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
