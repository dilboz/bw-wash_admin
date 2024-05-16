import { Page } from "@components";
import { MainLayout } from "@layouts";

export const ServerError: React.FC = (): JSX.Element => {
  return (
    <Page title="Ошибка 500">
      <MainLayout>
        <div className="notFound">
          <h1>Ошибка 500</h1>
        </div>
      </MainLayout>
    </Page>
  );
};
