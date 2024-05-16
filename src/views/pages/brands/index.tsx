import React from "react";
import { Image, Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { AppPaths } from "@constants";
import { DeleteIcon } from "@icons";
import { useAppDispatch, useAppSelector } from "@store";
import { brandControllers } from "@controllers";
import { BaseUrlWithoutApi } from "@utils/BaseUrl";

export const Brands: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { data, pending } = useAppSelector((state) => state.brand);

  const handleRemoveBanner = React.useCallback(
    (id: string) => {
      dispatch(brandControllers.delete(id));
    },
    [dispatch]
  );

  React.useEffect(() => {
    dispatch(brandControllers.get());
  }, [dispatch]);

  return (
    <Page title="Бренды">
      <MainLayout>
        <div className="banners">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title">Бренды</h1>
            <Link to={AppPaths.addBrand} className="button button-primary">
              Добавить бренд
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
                        width={400}
                        height={200}
                      />
                    </div>
                    <div className="banner__tools">
                      <button
                        onClick={() => handleRemoveBanner(item.id)}
                        className="banner__btn banner__delete-btn"
                      >
                        <DeleteIcon size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </MainLayout>
    </Page>
  );
};
