import React from "react";
import debounce from "lodash.debounce";
import { SearchIcon } from "@icons";
import classNames from "classnames";

interface IProps {
  className?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const Search: React.FC<IProps> = (props): JSX.Element => {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(props.value);

  const debouncedChangeHandler = React.useMemo(
    () => debounce((v) => props.onChange(v), 500),
    [props]
  );

  React.useEffect(() => {
    return () => debouncedChangeHandler.cancel();
  }, [debouncedChangeHandler]);

  return (
    <div
      className={classNames(
        "search",
        props.className,
        focus && "search_status_focus"
      )}
    >
      <span className="search__icon">
        <SearchIcon size={24} />
      </span>

      <input
        type="text"
        className="search__input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedChangeHandler(e.target.value);
        }}
        placeholder={props.placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};
