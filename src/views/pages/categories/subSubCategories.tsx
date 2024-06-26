import React from "react";
import { ICategories } from "@interfaces";
import { KeyboardArrowDownIcon } from "@icons";
import classNames from "classnames";
import { Link } from "@components";
import { Paths } from "@constants";
import { categoryServices } from "@services";

interface IProps {
  id: string | null;
  title: string;
  list: ICategories[] | undefined;
}

const SubSubCategories: React.FC<IProps> = (props): JSX.Element => {
  const [showMore, setShowMore] = React.useState<boolean>(false);

  if (!props.list) return <></>;
  return (
    <div className="subsubcategories">
      <Link
        to={Paths.editCategory + "/" + props.id}
        className="subsubcategories__title"
      >
        {props.title}
      </Link>
      <div className="subsubcategories__list">
        {props.list
          .slice(0, showMore ? props.list.length : 5)
          .map((subsubcat) => (
            <div className="category-box" key={subsubcat.id}>
              <Link
                to={Paths.editCategory + "/" + subsubcat.id}
                className="subsubcategories__item"
              >
                {subsubcat.name}
              </Link>
              <input
                type="checkbox"
                defaultChecked={subsubcat?.isActive}
                className="pointer"
                onClick={(e) =>
                  categoryServices.update({
                    id: subsubcat?.id,
                    visibility: e.currentTarget.checked,
                  })
                }
              />
            </div>
          ))}
      </div>
      {props.list.length > 5 && (
        <button
          className={classNames(
            "categories-showmore",
            showMore && "categories-showmore_active"
          )}
          onClick={() => setShowMore(!showMore)}
        >
          Ещё
          <div className="categories-showmore__icon">
            <KeyboardArrowDownIcon size={18} />
          </div>
        </button>
      )}
    </div>
  );
};

export default SubSubCategories;
