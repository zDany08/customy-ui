import React from "react";
import { twMerge } from "tailwind-merge";

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button(props: ButtonProps) {
    const { className, children, ...rest } = props;
    return (
        <button {...rest} className={twMerge("px-4 py-1.5 flex flex-row justify-center items-center gap-2 font-[Inter,sans-serif] text-[1rem] text-neutral-100 leading-[19px] bg-brand-500 border-2 border-brand-200 dark:border-brand-800 rounded-md cursor-pointer hover:opacity-70 transition-all select-none", className)}>
            {children}
        </button>
    );
}
