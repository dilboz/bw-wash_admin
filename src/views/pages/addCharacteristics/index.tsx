import { Link, Page } from "@components";
import { AppPaths } from "@constants";
import { characteristicControllers } from "@controllers";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import classNames from "classnames";
import React from "react";

export const AddCharacteristics: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { pending } = useAppSelector((state) => state.characteristic);

  const [name, setName] = React.useState<string>("");

  const handleCreateCharacteristic = React.useCallback(() => {
    if (!name) return;
    dispatch(characteristicControllers.create({ name }));
  }, [dispatch, name]);

  return (
    <Page title="Добавить характеристику">
      <MainLayout>
        <div className="add-characteristics">
          <h1 className="title mb-3">Добавить характеристику</h1>
          <div className="deliveryType__add-new mb-3">
            <div className="d-flex gap-20">
              <div className="deliveryType__add-new-label">
                <p>Название характеристики</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="deliveryType__add-new-input"
                />
              </div>
            </div>
            <button
              disabled={pending}
              className={classNames(
                "deliveryType__add-new-btn",
                pending && "deliveryType__add-new-btn_pending"
              )}
              onClick={handleCreateCharacteristic}
            >
              Добавить
            </button>
            <Link
              to={AppPaths.characteristics}
              className="deliveryType__add-new-btn-cancel"
            >
              Отмена
            </Link>
          </div>
        </div>
      </MainLayout>
    </Page>
  );
};
