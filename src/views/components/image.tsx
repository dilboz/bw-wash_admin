import classNames from "classnames";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

interface IPropst {
  className?: string;
  width?: number;
  height?: number;
  src: string;
  alt: string;
}

export const Image: React.FC<IPropst> = (props): JSX.Element => {
  return (
    <div className={classNames("image", props.className)} style={{height: props?.height}}>
      <LazyLoadImage
        width={props?.width}
        height={props?.height}
        alt={props.alt}
        src={props.src}
        effect="opacity"
        delayMethod="throttle"
      />
    </div>
  );
};
