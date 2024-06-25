import { Link } from "@components";
import { Paths } from "@constants";
import { ICategories } from "@interfaces";
import { categoryServices } from "@services";
import { BaseUrl } from "@utils/BaseUrl";
import classNames from "classnames";
import { useState } from "react";

interface IProps {
  list: ICategories[];
  activeId: string | null;
  onSetActive: (id: string | null) => void;
}

const Categories: React.FC<IProps> = (props): JSX.Element => {
  const [updateShowIndex, setUpdateShowIndex] = useState<
    { id: number; categoryId: string }[]
  >([]);

  const [list, setList] = useState(props.list);

  const handleSave = async () => {
    for (let i = 0; i <= updateShowIndex?.length - 1; i++) {
      await fetch(
        BaseUrl +
          "/categories/" +
          updateShowIndex[i]?.categoryId +
          "/showindex/" +
          updateShowIndex[i]?.id,
        { method: "PATCH" }
      ).then((res) => res.status);
    }

    window.location.reload();
  };

  return (
    <div className="categories">
      {list?.map((category: any, index) => {
        return (
          <div key={category.id} className="category-box" draggable>
            <select
              onChange={(e) =>
                setUpdateShowIndex((prev: any) => [
                  ...prev,
                  { id: Number(e.target.value), categoryId: category?.id },
                ])
              }
              key={category?.name}
              defaultValue={category?.showIndex}
            >
              {Array.from({ length: list?.length }, (_, index) => (
                <option key={index}>{index + 1}</option>
              ))}
            </select>
            <Link
              className={classNames(
                "categories__item",
                props.activeId === category.id && "categories__item_active"
              )}
              to={Paths.editCategory + "/" + category.id}
              onHover={() => props.onSetActive(category?.id)}
            >
              {category.name}
            </Link>
            <input
              type="checkbox"
              defaultChecked={category?.isActive}
              alt=""
              className="pointer"
              onClick={(e) =>
                categoryServices.update({
                  id: category?.id,
                  visibility: e.currentTarget.checked,
                })
              }
            />
          </div>
        );
      })}
      <button
        style={{
          padding: "10px",
          borderRadius: "10px",
          color: "#3574b9",
          border: "1px solid #3574b9",
        }}
        onClick={() => setUpdateShowIndex([])}
      >
        Отменить
      </button>
      <button
        style={{
          padding: "10px",
          borderRadius: "10px",
          background: "#3574b9",
          color: "white",
        }}
        disabled={updateShowIndex?.length === 0}
        onClick={handleSave}
      >
        Сохранить
      </button>
    </div>
  );
};

export default Categories;
