import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export const Page: React.FC<IProps> = ({
  title,
  children,
  ...rest
}): JSX.Element => {
  React.useEffect(() => {
    const prevTitle: string = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
  return <div {...rest}>{children}</div>;
};
