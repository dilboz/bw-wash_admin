import React from "react";
import { Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { ICharacteristicWithValue } from "@interfaces";
import { AppPaths } from "@constants";
import { Characteristic } from "./Characteristic";
import { useAppDispatch, useAppSelector } from "@store";
import { characteristicControllers } from "@controllers";
import { CharacteristicsSkeleton } from "@skeletons";

export const Characteristics: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { dataWithValue, pending } = useAppSelector(
    (state) => state.characteristic
  );

  React.useEffect(() => {
    dispatch(characteristicControllers.getWithValues());
  }, [dispatch]);

  return (
    <Page title="Характеристки">
      <MainLayout>
        <div className="deliveryType">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="title">Характеристики</h1>
            <Link
              to={AppPaths.addCharacteristics}
              className="button button-primary"
            >
              Добавить характеристику
            </Link>
          </div>
          <div className="deliveryType__list">
            {pending && <CharacteristicsSkeleton />}
            {!pending &&
              dataWithValue.map((item: ICharacteristicWithValue) => (
                <Characteristic
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  values={item.values}
                />
              ))}
          </div>
        </div>
      </MainLayout>
    </Page>
  );
};
