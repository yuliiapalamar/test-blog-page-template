import type { ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: "div" | "section" | "header" | "footer";
  yPadding?: "sm" | "base" | "lg";
  collapsible?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Bounded({
  as: Comp = "div",
  yPadding = "base",
  collapsible = true,
  className,
  children,
}: BoundedProps) {
  return (
    <Comp
      data-collapsible={collapsible}
      className={clsx(
        "px-5",
        yPadding === "sm" && "py-8 md:px-28",
        yPadding === "base" && "py-10 md:px-28 lg:px-52",
        yPadding === "lg" && "py-24 md:px-96",
        className,
      )}
    >
      <div className=" w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
