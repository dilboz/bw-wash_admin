import { Page } from "@components";
import { MainLayout } from "@layouts";

export const ForgotPassword: React.FC = (): JSX.Element => {
  return (
    <Page title="Восстановление пароля">
      <MainLayout>
        <div className="forgotPassword"></div>
      </MainLayout>
    </Page>
  );
};
