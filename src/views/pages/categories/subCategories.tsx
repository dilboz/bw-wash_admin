import React from "react";
import { ISubCategories } from "@interfaces";
import CategoriesSubSubList from "./subSubCategories";
import { categoryServices } from "@services";

interface IProps {
  list: ISubCategories[] | undefined;
}

const SubCategories: React.FC<IProps> = (props): JSX.Element => {
  if (!props.list) return <></>;
  return (
    <div className="subcategories">
      {props.list.map((item) => (
        <div key={item.id} className="specategory">
          <CategoriesSubSubList
            id={item?.id}
            title={item.name}
            list={item.subCategories}
          />
          <input
            type="checkbox"
            defaultChecked={item?.isActive}
            className="ml-1 pointer"
            onClick={(e) =>
              categoryServices.update({
                id: item?.id,
                visibility: e.currentTarget.checked,
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default SubCategories;
