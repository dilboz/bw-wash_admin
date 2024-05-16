import { ICategoriesAll } from "@interfaces";
import classNames from "classnames";
import React from "react";

interface IProps {
  id: string;
  currentId?: string | null;
  list: ICategoriesAll[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

export const SubcategoriesMenu: React.FC<IProps> = ({
  id,
  list,
  currentId,
  selectedId,
  onSelect,
}): JSX.Element => {
  const [title, setTitle] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest("#subcategorymenu-" + id)) setOpen(false);
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
        });
    });
  }, [selectedId, list]);

  return (
    <div id={"subcategorymenu-" + id} className="dropdown">
      <button className="dropdown__label" onClick={() => setOpen(!open)}>
        <p>{title}</p>
      </button>

      {open && (
        <div className="dropdown__menu">
          {list.filter(item => item.id !== currentId).map((item) => (
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
              {item.subCategories?.filter(item => item.id !== currentId).map((subCategory) => (
                <button
                  key={subCategory.id}
                  className={classNames(
                    "dropdown__item",
                    "dropdown__item_h2",
                    subCategory.id === selectedId && "dropdown__item--active"
                  )}
                  onClick={() => {
                    onSelect(subCategory.id);
                    setOpen(false);
                  }}
                >
                  {subCategory.name}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
