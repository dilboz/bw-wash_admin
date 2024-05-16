import React from "react";
import { ISelectedCharacteristic } from "@interfaces";
import { DropdownMenu } from "@components";
import { DeleteIcon } from "@icons";
import { useAppSelector } from "@store";

interface IProps {
  characteristicsValues: ISelectedCharacteristic[];
  setCharacteristicsValues: (v: ISelectedCharacteristic[]) => void;
}

export const CharacteristicsDropdown: React.FC<IProps> = (
  props
): JSX.Element => {
  const characteristics = useAppSelector((state) => state.characteristic);

  const handleAdd = () => {
    props.setCharacteristicsValues([
      ...props.characteristicsValues,
      {
        id: String(new Date().valueOf()),
        value: {
          id: "",
          value: "",
        },
        characteristic: {
          id: "",
          name: "",
        },
      },
    ]);
  };

  const handleRemove = (id: string) => {
    props.setCharacteristicsValues(
      props.characteristicsValues.filter((item) => item.id !== id)
    );
  };

  const handleSelectCharacteristic = (
    common_id: string,
    id: string,
    value: string
  ) => {
    props.setCharacteristicsValues(
      props.characteristicsValues.map((item) => {
        if (item.id === common_id && item.characteristic.id !== id)
          return {
            ...item,
            characteristic: { id: id, name: value },
            value: { id: "", value: "" },
          };
        else return item;
      })
    );
  };

  const handleSelectValue = (common_id: string, id: string, value: string) => {
    props.setCharacteristicsValues(
      props.characteristicsValues.map((item) => {
        return item.id === common_id
          ? { ...item, value: { id: id, value: value } }
          : item;
      })
    );
  };

  if (characteristics.dataWithValue.length === 0)
    return (
      <div className="characteristics-list d-flex direction-column gap-20">
        <button className="add-btn add-btn_sm add-btn_disabled">
          Добавить характеристику
        </button>
      </div>
    );

  return (
    <div className="characteristics-list d-flex direction-column gap-20">
      {props.characteristicsValues.map((characteristicValue) => {
        const characteristicList = characteristics.dataWithValue;
        const valuesList =
          characteristicList.find(
            (item) => item.id === characteristicValue.characteristic.id
          )?.values || [];
        return (
          <div
            className="characteristics-list__item d-flex gap-20"
            key={characteristicValue.id}
          >
            <div className="characteristics-list__label">
              <div className="characteristics-list__label-name mb-1">
                Название
              </div>
              <DropdownMenu
                id={"characteristic-" + characteristicValue.id}
                value={characteristicValue.characteristic.name}
                list={characteristicList.map((item) => ({
                  id: item.id,
                  name: item.name,
                }))}
                onSelect={(value: string, id?: string) =>
                  handleSelectCharacteristic(
                    characteristicValue.id,
                    id || "",
                    value
                  )
                }
              />
            </div>
            <div className="characteristics-list__label">
              <div className="characteristics-list__label-name mb-1">
                Значение
              </div>
              <DropdownMenu
                id={"value-" + characteristicValue.id}
                value={characteristicValue.value.value}
                list={valuesList.map((item) => ({
                  id: item.id,
                  name: item.value,
                }))}
                onSelect={(value: string, id?: string) =>
                  handleSelectValue(characteristicValue.id, id || "", value)
                }
              />
            </div>
            <div className="characteristics-list__label">
              <button
                onClick={() => handleRemove(characteristicValue.id)}
                className="characteristics-list__button"
              >
                <DeleteIcon size={24} />
              </button>
            </div>
          </div>
        );
      })}
      <button onClick={handleAdd} className="add-btn add-btn_sm">
        Добавить характеристику
      </button>
    </div>
  );
};
