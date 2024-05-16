import React from "react";

interface IProps {
  id: string;
  value: string;
  list: {
    id: string;
    name: string;
  }[];
  className?: string;
  onSelect: (value: string, id?: string) => void;
}

export const DropdownMenu: React.FC<IProps> = (props): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleClick = (e: any) => {
      if (!e.target.closest("#DropdownMenu-" + props.id)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.addEventListener("click", handleClick);
  }, [props.id]);

  if (props.list.length === 0)
    return (
      <div id={"DropdownMenu-" + props.id} className="dropdown disabled">
        <div className="dropdown__label" onClick={() => setOpen(!open)}>
          Выбрать
        </div>
      </div>
    );

  return (
    <div
      id={"DropdownMenu-" + props.id}
      className={"dropdown " + props?.className || ""}
    >
      <div className="dropdown__label" onClick={() => setOpen(!open)}>
        {props.value !== "" ? props.value : "Выбрать"}
      </div>

      {open && (
        <div className="dropdown__menu">
          {props.list.map(({ id, name }) => (
            <div
              key={id}
              className="dropdown__menu-item"
              onClick={() => {
                props.onSelect(name, id);
                setOpen(false);
              }}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
