import React from "react";
import clsxm from "../../utils/clsxm";

export type DotProps = {
  className?: string;
};
export const Dot = ({ className }: DotProps) => {
  return (
    <div
      className={clsxm(
        "my-auto h-[2px] w-[2px] rounded-full bg-primaryBlack",
        className
      )}
    />
  );
};
