import { Page } from "@components";
import { MainLayout } from "@layouts";

export const NotFound: React.FC = (): JSX.Element => {
  return (
    <Page title="Ошибка 404">
      <MainLayout>
        <div className="notFound">
          <h1>Ошибка 404</h1>
        </div>
      </MainLayout>
    </Page>
  );
};
