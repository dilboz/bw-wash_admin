import { Page } from "@components";
import { ordersControllers } from "@controllers";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { BaseUrlWithoutApi } from '@utils/BaseUrl';
import classNames from "classnames";
import React from "react";
import { useParams } from "react-router-dom";
import "./index.css";

export const Order: React.FC = (): JSX.Element => {
  const { id } = useParams();
  const { orderById } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!id) return;
    dispatch(ordersControllers.getById(id));
  }, [id, dispatch]);

  return (
    <Page title={"Заказ № " + id}>
      <MainLayout>
        {orderById && (
          <div className="order">
            <div className="order__item">
              <div className="order__title">Имя заказчика</div>
              <div className="order__value">
                {orderById.firstName} {orderById.lastName}
              </div>
            </div>
            <div className="order__item">
              <div className="order__title">Статус заказа</div>
              <div
                className={classNames(
                  "order__value",
                  orderById.orderStatus === "Новый" && "order__value--new",
                  orderById.orderStatus === "Отказано" &&
                    "order__value--rejected",
                  orderById.orderStatus === "Одобрено" &&
                    "order__value--approved"
                )}
              >
                {orderById.orderStatus}
              </div>
            </div>
            <div className="order__item">
              <div className="order__title">Доставка</div>
              <div className="order__value">{orderById.deliveryType}</div>
            </div>
            <div className="order__item">
              <div className="order__title">Номер телефона</div>
              <div className="order__value">{orderById?.phoneNumber}</div>
            </div>
            <div className="order__item">
              <div className="order__title">Способ оплаты</div>
              <div className="order__value">{orderById.paymentType}</div>
            </div>
            <div className="order__item">
              <div className="order__title">Дата заказа</div>
              <div className="order__value">
                {new Date(orderById.orderAt).toLocaleDateString()}
              </div>
            </div>
            <div className="order__text">
              <div className="order__title">Примечание к заказу</div>
              <div className="order__value">
                {orderById.description === ""
                  ? "Отсутсвует"
                  : orderById.description}
              </div>
            </div>
            <table>
              <tr>
                <th>Превью</th>
                <th>Название товара</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Вендор-код</th>
              </tr>
              {orderById.type.map((product, index) => (
                <tr key={product.vendorCode + index}>
                  <td>
                    <div className='myProductImageInOrder'>
                      <img src={BaseUrlWithoutApi + product.imagePath} alt="" />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>
                    {product.price - (product.price * product.discount) / 100}{" "}
                    с.
                  </td>
                  <td>{product.count}</td>
                  <td>{product.vendorCode}</td>
                </tr>
              ))}
            </table>
            <div className="order__result">
              Итого:{" "}
              {orderById.type.reduce(
                (acc, item) =>
                  acc +
                  (item.price - (item.price * item.discount) / 100) *
                    item.count,
                0
              )}{" "}
              с.
            </div>
          </div>
        )}
      </MainLayout>
    </Page>
  );
};
