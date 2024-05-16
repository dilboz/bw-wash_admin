import { Link } from "@components";
import { Paths } from "@constants";
import { ICategories } from "@interfaces";
import classNames from "classnames";

interface IProps {
  list: ICategories[];
  activeId: string | null;
  onSetActive: (id: string | null) => void;
}

const Categories: React.FC<IProps> = (props): JSX.Element => {
  return (
    <div className="categories">
      {props.list.map((category) => (
        <Link
          className={classNames(
            "categories__item",
            props.activeId === category.id && "categories__item_active"
          )}
          key={category.id}
          to={Paths.editCategory + "/" + category.id}
          onHover={() => props.onSetActive(category?.id)}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
