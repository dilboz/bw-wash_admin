import React from "react";
import { ISubCategories } from "@interfaces";
import CategoriesSubSubList from "./subSubCategories";

interface IProps {
  list: ISubCategories[] | undefined;
}

const SubCategories: React.FC<IProps> = (props): JSX.Element => {
  if (!props.list) return <></>;
  return (
    <div className="subcategories">
      {props.list.map((item) => (
        <CategoriesSubSubList
          id={item?.id}
          key={item.id}
          title={item.name}
          list={item.subCategories}
        />
      ))}
    </div>
  );
};

export default SubCategories;
