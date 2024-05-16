import React from "react";
import { Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { IDeliveryType } from "@interfaces";
import { AppPaths } from "@constants";
import { useAppDispatch, useAppSelector } from "@store";
import { deliveryTypeControllers } from "@controllers";
import { DeliveryTypesSkeleton } from "@skeletons";

export const DeliveryType: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { data, pending } = useAppSelector((state) => state.deliveryType);

  const handleRemoveBanner = React.useCallback(
    (id: string) => {
      dispatch(deliveryTypeControllers.delete(id));
    },
    [dispatch]
  );

  React.useEffect(() => {
    dispatch(deliveryTypeControllers.get());
  }, [dispatch]);

  return (
    <Page title="Способы доставки">
      <MainLayout>
        <div className="deliveryType">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title">Способы доставки</h1>
            <Link
              to={AppPaths.addDeliveryType}
              className="button button-primary"
            >
              Добавить способ доставки
            </Link>
          </div>
          <div className="deliveryType__list">
            {pending && <DeliveryTypesSkeleton />}
            {!pending &&
              data.map((item: IDeliveryType) => (
                <div className="deliveryType__item" key={item.id}>
                  <div className="deliveryType__item-info">
                    <div className="deliveryType__item-name">{item.name}</div> –
                    <div className="deliveryType__item-price">
                      {item.price} с.
                    </div>
                  </div>
                  <div className="deliveryType__item-tools">
                    <Link
                      to={AppPaths.editDeliveryType + "/" + item.id}
                      className="deliveryType__item-edit"
                    >
                      редактировать
                    </Link>
                    <button
                      className="deliveryType__item-delete"
                      onClick={() => handleRemoveBanner(item.id)}
                    >
                      удалить
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </MainLayout>
    </Page>
  );
};
