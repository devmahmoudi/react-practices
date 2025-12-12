import type { SectionComponentProps } from "../types";
import type { ReactElement } from "react";

/**
 * Section component
 * @param props SectionComponentProps
 * @returns ReactElement
 */
const Section = (props: SectionComponentProps): ReactElement => {
  return (
    <>
      <h4>{props.title}</h4>
      <div>{props.children}</div>
    </>
  );
};

export default Section;
