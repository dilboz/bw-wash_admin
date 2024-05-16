import { FC } from "react";
import ContentLoader from "react-content-loader";
interface IProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  className?: string;
}

export const Skeleton: FC<IProps> = ({
  height = 11,
  width = 200,
  radius = 3,
  className,
  ...rest
}) => (
  <ContentLoader
    speed={0.5}
    width={width}
    height={height}
    backgroundColor="#DCDCDC"
    foregroundColor="#F6F6F6"
    {...rest}
  >
    <rect x="0" y="0" rx={radius} ry={radius} width={width} height={height} />
  </ContentLoader>
);
