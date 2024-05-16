import React from "react";
import { useParams } from "react-router-dom";
import { Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { deliveryTypeControllers } from "@controllers";
import { history } from "@utils/history";
import { AppPaths, ErrorPaths } from "@constants";
import classNames from "classnames";

export const EditDeliveryType: React.FC = (): JSX.Element => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const [name, setName] = React.useState<string>("");
  const [price, setPrice] = React.useState<string>("0");

  const { deliveyTypeById, pending } = useAppSelector(
    (state) => state.deliveryType
  );

  const handleChangePrice = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (!isNaN(Number(value)))
      if (Number(value) < 0) return;
      setPrice(e.target.value);
    },
    []
  );

  const handleEditDeliveryType = React.useCallback(() => {
    if (!id) return;
    dispatch(deliveryTypeControllers.edit({ name, price }, id));
  }, [name, price, dispatch, id]);

  React.useEffect(() => {
    if (!id) return;
    dispatch(deliveryTypeControllers.getById(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (!pending) return;
    if (!deliveyTypeById) return history.push(ErrorPaths.notFound);
    setName(deliveyTypeById.name);
    setPrice(deliveyTypeById.price);
  }, [id, deliveyTypeById, pending]);

  return (
    <Page title="Изменить способ доставки">
      <MainLayout>
        <div className="add-characteristics">
          <h1 className="title mb-3">Изменить способ доставки</h1>
          <div className="deliveryType__add-new mb-3">
            <div className="d-flex gap-20">
              <div className="deliveryType__add-new-label">
                <p>Название доставки</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="deliveryType__add-new-input"
                />
              </div>
              <div className="deliveryType__add-new-label">
                <p>Стоимость</p>
                <input
                  type="text"
                  value={price}
                  onChange={handleChangePrice}
                  className="deliveryType__add-new-input"
                />
              </div>
            </div>
            <button
              onClick={handleEditDeliveryType}
              disabled={pending}
              className={classNames(
                "deliveryType__add-new-btn",
                pending && "deliveryType__add-new-btn_pending"
              )}
            >
              Изменить
            </button>
            <Link
              to={AppPaths.deliveryType}
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
