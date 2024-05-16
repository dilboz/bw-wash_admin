import { Page } from "@components";
import { MainLayout } from "@layouts";

export const ConnectionError: React.FC = (): JSX.Element => {
  return (
    <Page title="Нет доступа к сети">
      <MainLayout>
        <div className="notFound">
          <h1>Нет доступа к сети</h1>
          <h3 className="mt-1">Проверьте подключение к интернету</h3>
        </div>
      </MainLayout>
    </Page>
  );
};
