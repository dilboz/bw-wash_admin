import { ICategoriesAll } from "@interfaces";
import classNames from "classnames";
import React from "react";

interface IProps {
  id: string;
  list: ICategoriesAll[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const SubSubcategoriesMenu: React.FC<IProps> = ({
  id,
  list,
  selectedId,
  onSelect,
}): JSX.Element => {
  const [title, setTitle] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest("#subsubcategorymenu-" + id)) setOpen(false);
    };
    window.addEventListener("click", handleClick);
    return () => window.addEventListener("click", handleClick);
  }, [id]);

  React.useEffect(() => {
    list.forEach((cat) => {
      if (cat.id === selectedId) setTitle(cat.name);
      else
        cat.subCategories?.forEach((subcat) => {
          if (subcat.id === selectedId) setTitle(subcat.name);
          else
            subcat.subCategories?.forEach((subsubcat) => {
              if (subsubcat.id === selectedId) setTitle(subsubcat.name);
            });
        });
    });
  }, [selectedId, list]);

  if (list.length === 0)
    return (
      <div id={"DropdownMenu-" + id} className="dropdown disabled">
        <div className="dropdown__label" onClick={() => setOpen(!open)}>
          Выбрать
        </div>
      </div>
    );

  return (
    <div id={"subsubcategorymenu-" + id} className="dropdown">
      <button className="dropdown__label" onClick={() => setOpen(!open)}>
        <p>{title || "Выбрать"}</p>
      </button>

      {open && (
        <div className="dropdown__menu">
          {list.map((item) => (
            <React.Fragment key={item.id}>
              <button
                className={classNames(
                  "dropdown__item",
                  "dropdown__item_h1",
                  item.id === selectedId && "dropdown__item--active"
                )}
                onClick={() => {
                  onSelect(item.id);
                  setOpen(false);
                }}
              >
                {item.name}
              </button>
              {item.subCategories?.map((subCategory) => (
                <React.Fragment key={subCategory.id}>
                  <button
                    className={classNames(
                      "dropdown__item",
                      "dropdown__item_h2",
                      "fw-bold",
                      subCategory.id === selectedId && "dropdown__item--active"
                    )}
                    onClick={() => {
                      onSelect(subCategory.id);
                      setOpen(false);
                    }}
                  >
                    {subCategory.name}
                  </button>
                  {subCategory.subCategories?.map((subSubCategory) => (
                    <button
                      key={subSubCategory.id}
                      className={classNames(
                        "dropdown__item",
                        "dropdown__item_h3",
                        subSubCategory.id === selectedId &&
                          "dropdown__item--active"
                      )}
                      onClick={() => {
                        onSelect(subSubCategory.id);
                        setOpen(false);
                      }}
                    >
                      {subSubCategory.name}
                    </button>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
