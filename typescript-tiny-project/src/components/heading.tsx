import type { ReactElement } from "react";
import type { HeadingProps } from "../types";

/**
 * Heading Component
 * @param props HeadingProps
 * @returns ReactElement
 */
const Heading = (props: HeadingProps): ReactElement => {
  return (
    <div className="text-center">
      <h1>{props.title}</h1>
      <h5 style={{ color: "silver" }}>{props.subTitle}</h5>
    </div>
  );
};

export default Heading;
