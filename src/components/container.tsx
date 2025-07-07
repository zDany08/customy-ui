import React from "react";
import { twMerge } from "tailwind-merge";

export type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Container(props: ContainerProps) {
    const { className, children, ...rest } = props;
    return (
        <div {...rest} className={twMerge("flex p-3 gap-2 bg-neutral-100 dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-700 rounded-md", className)}>{children}</div>
    );
}
