import React from "react";
import { MainLayout } from "@layouts";
import CategoriesRoot from "./categories";
import SubCategories from "./subCategories";
import { Link, Page } from "@components";
import { AppPaths } from "@constants";
import { categoryControllers } from "@controllers";
import { useAppDispatch, useAppSelector } from "@store";

export const Categories: React.FC = (): JSX.Element => {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const dispatch = useAppDispatch();

  const { data, pending } = useAppSelector((state) => state.category);

  React.useEffect(() => {
    dispatch(categoryControllers.get());
  }, [dispatch]);

  React.useEffect(() => {
    if (!data[0]) return;
    setActiveId(data[0].id);
  }, [data]);

  return (
    <Page title="Категории">
      <MainLayout>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="title">Категории</h1>
          <Link to={AppPaths.addCategory} className="button button-primary">
            Добавить категорию
          </Link>
        </div>
        <div className="categoriesRoot">
          {!pending && (
            <>
              <CategoriesRoot
                list={data.map((i) => ({ id: i.id, name: i.name }))}
                activeId={activeId}
                onSetActive={setActiveId}
              />
              <SubCategories
                list={data.find((i) => i.id === activeId)?.subCategories}
              />
            </>
          )}
        </div>
      </MainLayout>
    </Page>
  );
};
