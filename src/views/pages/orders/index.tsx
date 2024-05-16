import React from "react";
import { Link, Page, Pagination } from "@components";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { ordersControllers } from "@controllers";
import { DeliveryTypesSkeleton } from "@skeletons";
import { IOrder, IOrdersParams } from "@interfaces";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "@constants";
import { QueryToObject, QueryToString } from "@functions";

const initialParams: IOrdersParams = {
  page: 1,
};

export const Orders: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [params, setParams] = React.useState<IOrdersParams | null>(null);

  const { data, pending, pageCount } = useAppSelector((state) => state.orders);

  const navigate = useNavigate();

  const handleApprove = React.useCallback(
    (item: IOrder) => {
      dispatch(ordersControllers.edit({ ...item, orderStatusId: 2 }));
    },
    [dispatch]
  );

  const handleReject = React.useCallback(
    (item: IOrder) => {
      dispatch(ordersControllers.edit({ ...item, orderStatusId: 3 }));
    },
    [dispatch]
  );

  const handleSetParams = (state: keyof IOrdersParams, value: number): void => {
    setParams((prev) => ({ ...prev, [state]: value }));
  };

  React.useEffect(() => {
    if (!params) return;
    navigate(AppPaths.orders + "?" + QueryToString(params));
    dispatch(ordersControllers.get(params));
  }, [navigate, params, dispatch]);

  React.useMemo(() => {
    const urlParams = QueryToObject();

    setParams({
      page: Number(urlParams.page || initialParams.page),
    });
  }, []);

  return (
    <Page title="Список заказов">
      <MainLayout>
        <div className="deliveryType">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title">Заказы</h1>
          </div>
          <div className="myTable">
            {pending && <DeliveryTypesSkeleton />}
            <div className="myTableRowHead">
              <div className='myTableRow__grid'>
                <div className="deliveryType__item-name">
                  Номер телефона
                </div>
                <div className="deliveryType__item-name">
                  Способ доставки
                </div>
                <div className="deliveryType__item-name">
                  Способ оплаты
                </div>
                <div className="deliveryType__item-name">
                  Дата
                </div>
                <div className="deliveryType__item-name">
                  Сумма
                </div>
              </div>
              <div className="tempDiv"></div>
            </div>
            {!pending &&
              data.map((item: IOrder) => (
                <div className="myTableRow" key={item.orderId}>
                  <Link
                    to={"/orders/" + item.orderId}
                    className="deliveryType__item-info"
                  >
                    <div className="deliveryType__item-name">
                      {`${
                        `${item.phoneNumber}`.indexOf("+") === -1 ? "+" : ""
                      }${item.phoneNumber}`.replaceAll(" ", "")}
                    </div>
                    <div className="deliveryType__item-name">
                      {item.deliveryTypeId}
                    </div>
                    <div className="deliveryType__item-name">
                      {item.paymentTypeId}
                    </div>
                    <div className="deliveryType__item-name">
                      {new Date(item.orderAt).toLocaleDateString()}
                    </div>
                    <div className="deliveryType__item-name">
                      {item.type.reduce((acc, cur) => acc + (cur.price - (cur.price / 100 * cur.discount)) * cur.count, 0)}
                    </div>
                  </Link>
                  <div className="deliveryType__item-tools">
                    <button
                      onClick={() => handleApprove(item)}
                      className={classNames(
                        "deliveryType__item-success deliveryType__item-staticBtn",
                        (item.orderStatusId === "Одобрено" || item.orderStatusId === 2) && "deliveryType__item-success__disabled"
                      )}
                    >
                      {(item.orderStatusId === "Одобрено" || item.orderStatusId === 2) ? "Одобрено" : "Одобрить"}
                    </button>
                    <button
                      onClick={() => handleReject(item)}
                      className={classNames(
                        "deliveryType__item-delete deliveryType__item-staticBtn",
                        (item.orderStatusId === "Отказано" || item.orderStatusId === 3) && "deliveryType__item-delete__disabled"
                      )}
                    >
                      {(item.orderStatusId === "Отказано" || item.orderStatusId === 3) ? "Отказано" : "Отказать"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <Pagination
            className="products__pagination mt-2"
            page={Number(params?.page || 1)}
            totalPages={pageCount}
            onPageChange={(p: number) => handleSetParams("page", p)}
          />
        </div>
      </MainLayout>
    </Page>
  );
};
