import { Page } from "@components";
import { MainLayout } from "@layouts";

export const InDeveloping: React.FC = (): JSX.Element => {
  return (
    <Page title="В разработке">
      <MainLayout>
        <div className="notFound">
          <h1>В разработке</h1>
          <h3 className="mt-1">
            Скоро эта страница будет доступна для эксплуатации
          </h3>
        </div>
      </MainLayout>
    </Page>
  );
};
