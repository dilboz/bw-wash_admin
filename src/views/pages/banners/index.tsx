import React from "react";
import { Image, Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { AppPaths } from "@constants";
import { DeleteIcon } from "@icons";
import { useAppDispatch, useAppSelector } from "@store";
import { bannerControllers } from "@controllers";
import { BaseUrlWithoutApi } from "@utils/BaseUrl";

export const Banners: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { data, pending } = useAppSelector((state) => state.banner);

  const handleRemoveBanner = React.useCallback(
    (id: string) => {
      dispatch(bannerControllers.delete(id));
    },
    [dispatch]
  );

  React.useEffect(() => {
    dispatch(bannerControllers.get());
  }, [dispatch]);

  return (
    <Page title="Баннеры">
      <MainLayout>
        <div className="banners">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title">Баннеры</h1>
            <Link to={AppPaths.addBanner} className="button button-primary">
              Добавить баннер
            </Link>
          </div>
          <div className="banner__list">
            {!pending &&
              data.map((item, index) => (
                <div className="banner__container" key={index}>
                  <a
                    draggable={false}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="banner__image"
                  >
                    <Image
                      src={BaseUrlWithoutApi + item.imagePath}
                      alt={"banner" + index}
                      width={800}
                      height={225}
                    />
                  </a>
                  <div className="banner__tools">
                    <button
                      className="banner__btn banner__delete-btn"
                      onClick={() => handleRemoveBanner(item.id)}
                    >
                      <DeleteIcon size={24} />
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
