import React, { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { ContainerProps, Container } from "./container";
import { ButtonProps, Button } from "./buttons";
import { TextFieldProps, TextField } from "./text-inputs";
import { DropdownProvider, useDropdown } from "../contexts/dropdown";

export type DropdownProps = {
    shown: boolean,
    onShow?: () => void,
    onHide?: () => void,
    children: React.ReactNode,
    placeholder?: string,
    value?: string,
    onChange?: (value?: string) => void
};

export function Dropdown(props: DropdownProps) {
    return (
        <DropdownProvider value={props}>
            <DropdownContent />
        </DropdownProvider>
    )
}

function DropdownContent() {
    const { shown }: DropdownProps = useDropdown();
    return (
        <div className="relative">
            <div className="flex flex-row transition-all">
                <DropdownField />
                {shown ? <FaAngleUp className="absolute right-3 top-[50%] -translate-y-[50%] size-5 text-neutral-800 dark:text-neutral-200 pointer-events-none" /> : <FaAngleDown className="absolute right-3 top-[50%] -translate-y-[50%] size-5 text-neutral-800 dark:text-neutral-200 pointer-events-none" />}
            </div>
            <DropdownMenu className="absolute top-10 w-full" />
        </div>
    );
}

export type DropdownFieldProps = Omit<TextFieldProps, "onClick"> & {
    children?: React.ReactNode
};

export function DropdownField(props: DropdownFieldProps) {
    const { className, children, ...rest } = props;
    const { shown, onShow, onHide, placeholder, value }: DropdownProps = useDropdown();
    const onClick = useCallback(() => {
        if(shown && onHide) onHide();
        if(!shown && onShow) onShow();
    }, [shown, onShow]);
    return (
        <div className="relative">
            <TextField {...rest} className={twMerge("cursor-pointer", className)} placeholder={placeholder} value={value ? value : ""} onClick={onClick} readOnly />
            {children}
        </div>
    );
}

export function DropdownMenu(props: ContainerProps) {
    const { className, ...rest } = props;
    const { shown, children }: DropdownProps = useDropdown();
    return (
        <Container {...rest} className={twMerge("p-2 flex-col", className, !shown && "hidden")}>
            {children}
        </Container>
    );
}

export type DropdownOptionProps = Omit<ButtonProps, "onClick"> & {
    option?: string
};

export function DropdownOption(props: DropdownOptionProps) {
    const { className, option, children, ...rest } = props;
    const { value, onHide, onChange }: DropdownProps = useDropdown();
    const onClick = useCallback(() => {
        if(onHide) onHide();
        if(onChange) onChange(option);
    }, [value, onChange]);
    return (
        <Button {...rest} className={twMerge("px-3 justify-start text-neutral-800 dark:text-neutral-200 border-none bg-transparent", !option && "text-neutral-300 dark:text-neutral-700", (value === option) && "bg-neutral-200 dark:bg-neutral-800", className)} onClick={onClick}>
            {children}
        </Button>
    );
}
