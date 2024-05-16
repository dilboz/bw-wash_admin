import React from "react";
import { Image, Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { AppPaths } from "@constants";
import { DeleteIcon, EditIcon } from "@icons";
import { useAppDispatch, useAppSelector } from "@store";
import { paymentTypesControllers } from "@controllers";
import { BaseUrlWithoutApi } from "@utils/BaseUrl";

export const PaymentTypes: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { data, pending } = useAppSelector((state) => state.paymentTypes);

  const handleRemovePaymentType = React.useCallback(
    (id: string) => {
      dispatch(paymentTypesControllers.delete(id));
    },
    [dispatch]
  );

  React.useEffect(() => {
    dispatch(paymentTypesControllers.get());
  }, [dispatch]);

  return (
    <Page title="Способы оплаты">
      <MainLayout>
        <div className="banners">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title">Способы оплаты</h1>
            <Link
              to={AppPaths.addPaymentType}
              className="button button-primary"
            >
              Добавить способ оплаты
            </Link>
          </div>
          <div className="banner__list">
            {!pending &&
              data.map((item, index) => (
                <div className="banner__item" key={index}>
                  <div className="banner__item-name mb-1">{item.name}</div>
                  <div className="banner__container">
                    <div className="banner__image banner__image_sm">
                      <Image
                        src={BaseUrlWithoutApi + item.imagePath}
                        alt={"banner" + index}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="banner__tools">
                      <button
                        onClick={() => handleRemovePaymentType(item.id)}
                        className="banner__btn banner__delete-btn"
                      >
                        <DeleteIcon size={24} />
                      </button>
                      <Link
                        to={AppPaths.editPaymentType + "/" + item.id}
                        className="banner__btn banner__edit-btn"
                      >
                        <EditIcon size={24} />
                      </Link>
                    </div>
                  </div>
                  <div className="banner__item-description mb-1">
                    {item.description}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </MainLayout>
    </Page>
  );
};
