declare module "react-vertical-timeline-component" {
  import { CSSProperties, ReactNode } from "react";

  export interface VerticalTimelineProps {
    animate?: boolean;
    className?: string;
    layout?: "1-column-left" | "1-column" | "2-columns" | "1-column-right";
    lineColor?: string;
    children: ReactNode;
  }

  export interface VerticalTimelineElementProps {
    children?: ReactNode;
    className?: string;
    contentArrowStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    date?: ReactNode;
    dateClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconStyle?: CSSProperties;
    iconOnClick?: () => void;
    onTimelineElementClick?: () => void;
    id?: string;
    position?: string;
    style?: CSSProperties;
    textClassName?: string;
    visible?: boolean;
    shadowSize?: "small" | "medium" | "large";
    intersectionObserverProps?: {
      root?: Element | null;
      rootMargin?: string;
      threshold?: number;
      triggerOnce?: boolean;
    };
  }

  export function VerticalTimeline(props: VerticalTimelineProps): JSX.Element;
  export function VerticalTimelineElement(
    props: VerticalTimelineElementProps
  ): JSX.Element;
}
