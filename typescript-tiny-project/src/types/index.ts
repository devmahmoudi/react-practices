import type { ReactNode } from "react";

/**
 * Heading Component Props
 */
export interface HeadingProps {
  title: string;
  subTitle: string;
};

/**
 * AppConfig interface
 */
export interface AppConfig {
    heading : HeadingProps
}

/**
 * Section component props interface
 */
export interface SectionComponentProps{
  children: ReactNode,
  title?: string
}