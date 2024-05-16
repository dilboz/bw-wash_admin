import React from "react";
import { Page } from "@components";
import { ILoginErrors } from "@interfaces";
import { useAppDispatch } from "@store";
import { authorizeUser, authorizeUserOld } from "@store/slice";

const initialErrors: ILoginErrors = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errors, setErrors] = React.useState<ILoginErrors>(initialErrors);

  const checkValidations = (): boolean => {
    if (email.trim().length === 0) {
      setErrors({ ...initialErrors, email: "Вы не ввели почту" });
      return false;
    } else if (password.trim().length === 0) {
      setErrors({ ...initialErrors, password: "Вы не ввели пароль" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const validResult: boolean = checkValidations();
    if (!validResult) return;
    dispatch(authorizeUserOld(email, password));
  };

  return (
    <Page title="Вход">
      <div className="login">
        <div className="login__form form">
          <div className="login__title form__title title">Входите</div>
          <label className="form__label label">
            <p className="form__label-name">Email</p>
            <div className="login__input form__label-input">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.example"
              />
            </div>
            {errors.email !== "" && (
              <div className="form__error">{errors.email}</div>
            )}
          </label>
          <label className="form__label label">
            <p className="form__label-name">Пароль</p>
            <div className="login__input form__label-input">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="************"
              />
            </div>
            {errors.password !== "" && (
              <div className="form__error">{errors.password}</div>
            )}
            {/* <div className='login__forget-password'>
              Забыли пароль?
            </div> */}
          </label>
          <button className="login__submit" onClick={handleSubmit}>
            Войти
          </button>
        </div>
      </div>
    </Page>
  );
};
