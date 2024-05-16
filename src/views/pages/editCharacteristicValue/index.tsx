import React from "react";
import { useParams } from "react-router-dom";
import { DropdownMenu, Link, Page } from "@components";
import { MainLayout } from "@layouts";
import { useAppDispatch, useAppSelector } from "@store";
import { history } from "@utils/history";
import { AppPaths, ErrorPaths } from "@constants";
import { characteristicControllers } from "@controllers";
import classNames from "classnames";

export const EditCharacteristicValue: React.FC = (): JSX.Element => {
  const { id } = useParams();

  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [selectedCharacteristic, setSelectedCharacteristic] = React.useState<{
    id: string;
    name: string;
  } | null>(null);

  const dispatch = useAppDispatch();
  const { dataWithValue, pending } = useAppSelector(
    (state) => state.characteristic
  );

  const handleEditValue = React.useCallback(() => {
    if (!id || !selectedCharacteristic) return;
    dispatch(
      characteristicControllers.editValue(
        { value: name, characteristicId: selectedCharacteristic.id },
        id
      )
    );
  }, [name, selectedCharacteristic, dispatch, id]);

  React.useEffect(() => {
    dispatch(characteristicControllers.get());
    dispatch(characteristicControllers.getWithValues());
  }, [dispatch]);

  React.useEffect(() => {
    if (!pending || !dataWithValue.length || loaded) return;
    let ok = false;
    for (let i = 0; i < dataWithValue.length; i++) {
      for (let j = 0; j < dataWithValue[i].values.length; j++) {
        if (dataWithValue[i].values[j].id === id) {
          setName(dataWithValue[i].values[j].value);
          setSelectedCharacteristic({
            id: dataWithValue[i].id,
            name: dataWithValue[i].name,
          });
          ok = true;
          setLoaded(true);
          return;
        }
      }
    }
    if (!ok) history.push(ErrorPaths.notFound);
  }, [id, dataWithValue, pending, loaded]);

  return (
    <Page title="Изменить значение характеристики">
      <MainLayout>
        <div className="add-characteristics">
          <h1 className="title mb-3">Изменить значение характеристики</h1>
          <DropdownMenu
            id="1"
            className="mb-3"
            value={selectedCharacteristic?.name || ""}
            list={dataWithValue}
            onSelect={(n: string, i?: string) => {
              setSelectedCharacteristic({ name: n, id: i ? i : "" });
            }}
          />
          <div className="deliveryType__add-new mb-3">
            <div className="d-flex gap-20">
              <div className="deliveryType__add-new-label">
                <p>Название значения</p>
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
              onClick={handleEditValue}
            >
              Изменить
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
