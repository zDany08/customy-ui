import React from "react";
import { twMerge } from "tailwind-merge";

export type TextFieldType = "text" | "tel" | "email" | "password" | "url";

export type TextFieldProps = React.DetailedHTMLProps<Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    type?: TextFieldType
}, HTMLInputElement>;

export function TextField(props: TextFieldProps) {
    const { className, ...rest } = props;
    return (
        <input {...rest} className={twMerge("px-3 py-1.5 text-[1rem] text-neutral-800 dark:text-neutral-200 caret-neutral-800 dark:caret-neutral-200 selection:bg-neutral-300 dark:selection:bg-neutral-700 selection:text-neutral-100 dark:selection:text-neutral-900 placeholder:text-neutral-300 dark:placeholder:text-neutral-700 placeholder:italic leading-[19px] bg-neutral-100 dark:bg-neutral-900 outline-none border-2 border-neutral-300 dark:border-neutral-700 focus:border-neutral-500 rounded-md transition-all", className)} />
    );
}

export type TextAreaProps = React.DetailedHTMLProps<Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "children"> & {
    children?: string
}, HTMLTextAreaElement>;

export function TextArea(props: TextAreaProps) {
    const { className, children, ...rest } = props;
    return (
        <textarea {...rest} className={twMerge("px-3 py-1.5 text-[1rem] text-neutral-800 dark:text-neutral-200 caret-neutral-800 dark:caret-neutral-200 selection:bg-neutral-300 dark:selection:bg-neutral-700 selection:text-neutral-100 dark:selection:text-neutral-900 placeholder:text-neutral-300 dark:placeholder:text-neutral-700 placeholder:italic leading-[19px] bg-neutral-100 dark:bg-neutral-900 outline-none border-2 border-neutral-300 dark:border-neutral-700 focus:border-neutral-500 rounded-md transition-all", className)}>
            {children}
        </textarea>
    );
}
