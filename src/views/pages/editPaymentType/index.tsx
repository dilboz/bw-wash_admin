import React from "react";
import { Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { paymentTypesControllers } from "@controllers";
import { AppPaths } from "@constants";
import { useParams } from "react-router-dom";
import { BaseUrlWithoutApi } from "@utils/BaseUrl";
import classNames from "classnames";

export const EditPaymentType: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { dataById, pending } = useAppSelector((state) => state.paymentTypes);
  const { id } = useParams();

  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);
  const [imagePath, setImagePath] = React.useState<string>("");

  const handleSelectImg = React.useCallback((files: FileList | null) => {
    if (!files) return;
    setFile(files[0]);
    setImagePath(URL.createObjectURL(files[0]));
  }, []);

  const handleEditPaymentType = React.useCallback(() => {
    if (!id) return;
    const formData = new FormData();
    if (file) formData.append("image", file || "");
    formData.append("name", name);
    formData.append("description", description);
    dispatch(paymentTypesControllers.edit(formData, id));
  }, [file, name, description, id, dispatch]);

  React.useEffect(() => {
    if (!id) return;
    dispatch(paymentTypesControllers.getById(id));
  }, [id, dispatch]);

  React.useEffect(() => {
    if (!dataById) return;
    setName(dataById?.name || "");
    setDescription(dataById?.description || "");
    setImagePath(BaseUrlWithoutApi + dataById?.imagePath || "");
  }, [dataById]);

  return (
    <Page title="Изменить способ оплаты">
      <MainLayout>
        <div className="add-characteristics">
          <h1 className="title mb-3">Изменить способ оплаты</h1>
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
                    src={imagePath}
                    alt="Выбранное изображение"
                  />
                </div>
              )}
              <div className="deliveryType__add-new-label">
                <p>Название</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="deliveryType__add-new-input"
                />
              </div>
              <div className="deliveryType__add-new-label">
                <p>Описание</p>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
              onClick={handleEditPaymentType}
            >
              Изменить
            </button>
            <Link
              to={AppPaths.paymentTypes}
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
