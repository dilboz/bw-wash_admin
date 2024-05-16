import React from "react";
import { Page } from "@components";
import { useAppDispatch } from "@store";
import { checkAuthCode } from "@store/slice";

const initialErrors = {
  code: ""
};

export const CheckCode = () => {
  const dispatch = useAppDispatch();

  const [code, setCode] = React.useState<string>("");
  const [errors, setErrors] = React.useState<{code: string}>(initialErrors);

  const checkValidations = (): boolean => {
    if (code.trim().length === 0) {
      setErrors({ ...initialErrors, code: "Вы не ввели код" });
      return false;
    } 
    return true;
  };

  const handleSubmit = () => {
    const validResult: boolean = checkValidations();
    if (!validResult) return;
    dispatch(checkAuthCode(code));
  };

  return (
    <Page title="Вход">
      <div className="login">
        <div className="login__form form">
          <div className="login__title form__title title">Введите код</div>
          <div className="login__title">Код отправлени вам на почту</div>
          <label className="form__label label">
            <p className="form__label-name">Code</p>
            <div className="login__input form__label-input">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="code"
                placeholder="name@company.example"
              />
            </div>
            {errors.code !== "" && (
              <div className="form__error">{errors.code}</div>
            )}
          </label>
          <button className="login__submit" onClick={handleSubmit}>
            Войти
          </button>
        </div>
      </div>
    </Page>
  );
};
