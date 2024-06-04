import React, { useState } from "react";
import { Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { bannerControllers } from "@controllers";
import { AppPaths } from "@constants";
import classNames from "classnames";

// @ts-ignore
import { ReactPhotoEditor } from "react-photo-editor";
import "react-photo-editor/dist/style.css";

export const AddBanner: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pending } = useAppSelector((state) => state.banner);

  const [src, setSrc] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);

  const [showModal, setShowModal] = useState(false)


  const hideModal = () => {
    setShowModal(false)
  }

  const handleSaveImage = (editedFile: File) => {
    setFile(editedFile);
  };

  const handleSelectImg = React.useCallback((files: FileList | null) => {
    if (!files) return;
    setShowModal(true);
    setFile(files[0]);
  }, []);

  const handleCreateBanner = React.useCallback(() => {
    if (!file) return;
    const fd = new FormData();
    fd.append("image", file);
    fd.append("href", src);

    dispatch(bannerControllers.create(fd));
  }, [file, src, dispatch]);

  return (
    <Page title="Добавить баннер">
      <MainLayout>
        <div className="add-characteristics">
          <h1 className="title mb-3">Добавить баннер</h1>
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
                <div className="deliveryType__add-new-label banner__image">
                  <img
                    className="img"
                    src={URL.createObjectURL(file)}
                    alt="Выбранное изображение"
                  />
                </div>
              )}
              <div className="deliveryType__add-new-label">
                <p>Ссылка баннера</p>
                <input
                  type="text"
                  value={src}
                  onChange={(e) => setSrc(e.target.value)}
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
              onClick={handleCreateBanner}
            >
              Добавить
            </button>
            <Link
              to={AppPaths.banners}
              className="deliveryType__add-new-btn-cancel"
            >
              Отмена
            </Link>
          </div>
        </div>
        {file && (
          <ReactPhotoEditor
            open={showModal}
            onClose={hideModal}
            file={file}
            onSaveImage={handleSaveImage}
          />
        )}
      </MainLayout>
    </Page>
  );
};
