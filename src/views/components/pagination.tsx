import { KeyboardArrowLeftIcon, KeyboardArrowRightIcon } from "@icons";
import classNames from "classnames";
import React from "react";

interface IProps {
  className?: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface IPage {
  type: "page" | "arrowRight" | "arrowLeft";
  value?: number;
}

export const Pagination: React.FC<IProps> = React.memo((props): JSX.Element => {
  const [pages, setPages] = React.useState<IPage[]>([]);

  React.useEffect(() => {
    const newPages: IPage[] = [];
    if (props.totalPages < 10) {
      for (let i = 1; i <= props.totalPages; i++) {
        newPages.push({ type: "page", value: i });
      }
    } else if (props.page < 7) {
      for (let i = 1; i <= 7; i++) {
        newPages.push({ type: "page", value: i });
      }
      newPages.push({ type: "arrowRight" });
      newPages.push({ type: "page", value: props.totalPages });
    } else if (props.page > props.totalPages - 6) {
      newPages.push({ type: "page", value: 1 });
      newPages.push({ type: "arrowLeft" });
      for (let i = props.totalPages - 6; i <= props.totalPages; i++) {
        newPages.push({ type: "page", value: i });
      }
    } else {
      newPages.push({ type: "page", value: 1 });
      newPages.push({ type: "arrowLeft" });
      for (let i = props.page - 2; i <= props.page + 2; i++) {
        newPages.push({ type: "page", value: i });
      }
      newPages.push({ type: "arrowRight" });
      newPages.push({ type: "page", value: props.totalPages });
    }
    setPages(newPages);
  }, [props.page, props.totalPages]);

  if (props.totalPages <= 1) return <></>;
  return (
    <div className={classNames("pagination", props.className)}>
      {pages.map((page, index) =>
        page.type === "page" ? (
          <div
            key={index}
            className={classNames(
              "pagination__item",
              page.value === props.page && "pagination__item--active"
            )}
            onClick={() => page.value && props.onPageChange(page.value)}
          >
            {page.value}
          </div>
        ) : page.type === "arrowRight" ? (
          <div
            key={index}
            className="pagination__item pagination__item--arrow"
            onClick={() => props.onPageChange(props.page + 1)}
          >
            <KeyboardArrowRightIcon size={20} />
          </div>
        ) : (
          <div
            key={index}
            className="pagination__item pagination__item--arrow"
            onClick={() => props.onPageChange(props.page - 1)}
          >
            <KeyboardArrowLeftIcon size={20} />
          </div>
        )
      )}
    </div>
  );
});
