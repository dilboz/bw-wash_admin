import { Link } from "@components";
import { AppPaths } from "@constants";
import { characteristicControllers } from "@controllers";
import { KeyboardArrowDownIcon } from "@icons";
import { ICharacteristicValue, ICharacteristicWithValue } from "@interfaces";
import { useAppDispatch } from "@store";
import classNames from "classnames";
import React from "react";

interface IProps extends ICharacteristicWithValue {}

export const Characteristic: React.FC<IProps> = (props): JSX.Element => {
  const dispatch = useAppDispatch();

  const menu = React.useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [menuHeight, setMenuHeight] = React.useState<number>(0);

  const handleDeleteCharacteristic = React.useCallback(() => {
    dispatch(characteristicControllers.delete(props.id));
  }, [dispatch, props.id]);

  const handleDeleteValue = React.useCallback(
    (id: string) => {
      dispatch(characteristicControllers.deleteValue(id));
    },
    [dispatch]
  );

  React.useEffect(() => {
    if (menu.current) {
      setMenuHeight(menu.current.clientHeight + 20);
    }
  }, [menu, props.values]);

  return (
    <div className={classNames("accordion", open && "accordion_open")}>
      <div className="deliveryType__item">
        <button
          onClick={() => setOpen(!open)}
          className={"deliveryType__item-info"}
        >
          <div className="deliveryType__item-name">{props.name}</div>
          {props.values.length !== 0 && (
            <div className="deliveryType__item-arrow">
              <KeyboardArrowDownIcon size={21} />
            </div>
          )}
        </button>
        <div className="deliveryType__item-tools">
          <Link
            to={AppPaths.addCharacteristicsValue + "/" + props.id}
            className="deliveryType__item-edit"
          >
            добавить значение
          </Link>
          <Link
            to={AppPaths.editCharacteristic + "/" + props.id}
            className="deliveryType__item-edit"
          >
            редактировать
          </Link>
          <button
            className="deliveryType__item-delete"
            onClick={handleDeleteCharacteristic}
          >
            удалить
          </button>
        </div>
      </div>
      {props.values.length !== 0 && (
        <div
          className="accordion__menu"
          style={{ height: open ? menuHeight + "px" || "0px" : "0px" }}
        >
          <div className="accordion__menu-wrap" ref={menu}>
            <div className="characteristic-values">
              {props.values.map(
                (item: Omit<ICharacteristicValue, "characteristicId">) => (
                  <div
                    className="characteristic-value accordion__menu-item"
                    key={item.id}
                  >
                    <div className="characteristic-value__name">
                      {item.value}
                    </div>
                    <Link
                      to={AppPaths.editCharacteristicValue + "/" + item.id}
                      className="characteristic-edit link"
                    >
                      редактировать
                    </Link>
                    <button
                      className="characteristic-delete link"
                      onClick={() => handleDeleteValue(item.id)}
                    >
                      удалить
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
