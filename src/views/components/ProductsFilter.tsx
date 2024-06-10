import { MouseEventHandler, useEffect, useState } from "react";

import axios from "axios";
import { ICategory } from "@interfaces";
import { useAppDispatch } from "@store";
import { setStatuses } from "@store/slice";
import { BaseUrl } from "@utils/BaseUrl";
import Dropdown from "./dropdown";

interface IProps {
  onChange: (value: string) => void;
}

export const ProductsFilter: React.FC<IProps> = ({ onChange }): JSX.Element => {
  const [categoriesState, setCategoriesState] = useState<ICategory[]>([]);
  const [checkedId, setCheckedId] = useState<string>("");
  const [categoryStatuses, setCategoryStatuses] = useState<any>([]);

  const dispatch = useAppDispatch();

  const getCategories = async () => {
    const response = await axios.get(
      process.env.REACT_APP_BASE_URL + "/categories/admin"
    );

    const categories = response.data;

    categories.forEach((category: any) => {
      setCategoryStatuses((prev: any) => ({
        ...prev,
        [category.id]: {
          loaded: false,
        },
      }));
    });

    dispatch(setStatuses(categoryStatuses));
    setCategoriesState(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleItemClick = (id: any) => {
    setCheckedId(id);
  };

  useEffect(() => {
    onChange(checkedId);
  }, [checkedId]);

  const handleDownloadCategory: MouseEventHandler<HTMLDivElement> = (event) => {
    axios.get(BaseUrl + "/product/dowloandexceldocument?id=" + checkedId);
  };

  return (
    <div className="categories-filter">
      <h3 className="categories-filter__title">Категории</h3>
      <br />
      <div
        style={{
          display: "flex",
          flexShrink: "1",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "4px",
            border: checkedId == "" ? "1px solid blue" : "1px solid #ccc",
            cursor: "pointer",
            width: "300px",
          }}
          onClick={() => handleItemClick("")}
        >
          Все
        </div>

        {categoriesState?.map((cat, index) => (
          <Dropdown
            key={index}
            placeholder={cat?.name}
            options={[{ id: cat?.id, name: cat?.name }, ...cat?.subCategories]}
            onSelect={(e: any) => handleItemClick(e?.id)}
            isActive={checkedId}
          />
        ))}

        <a
          className={`categories-filter__item ${!checkedId ? "active" : ""}`}
          // onClick={handleDownloadCategory}
          style={{
            backgroundColor: "green",
            color: "#fff",
          }}
          href={BaseUrl + "/product/dowloandexceldocument?id=" + checkedId}
        >
          Скачать как Excel файл
        </a>
      </div>
    </div>
  );
};
