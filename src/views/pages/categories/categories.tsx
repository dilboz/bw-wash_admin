import { Link } from "@components";
import { Paths } from "@constants";
import { categoryControllers, updateCategoryController } from "@controllers";
import { ICategories } from "@interfaces";
import { categoryServices } from "@services";
import { useAppDispatch } from "@store";
import classNames from "classnames";

interface IProps {
  list: ICategories[];
  activeId: string | null;
  onSetActive: (id: string | null) => void;
}

const Categories: React.FC<IProps> = (props): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className="categories">
      {props.list.map((category) => {
        return (
          <div key={category.id} className="category-box">
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
    </div>
  );
};

export default Categories;
