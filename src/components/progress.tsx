import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { ContainerProps } from "./container";
import { ProgressBarProvider, useProgressBar } from "../contexts/progress-bar";

export type ProgressBarType = "horizontal" | "vertical";

export type ProgressBarProps = {
    /**
     * Orientation of the bar
     */
    type: ProgressBarType,
    length: number,
    size: number,
    minValue: number,
    maxValue: number,
    /**
     * Flip to adapt every use case
     */
    flip?: boolean,
    value?: number
};

export function ProgressBar(props: ProgressBarProps) {
    return (
        <ProgressBarProvider value={props}>
            <ProgressBarContent />
        </ProgressBarProvider>
    );
}

function ProgressBarContent() {
    const { type, flip }: ProgressBarProps = useProgressBar();
    return (
        <div className={twMerge("relative overflow-hidden rounded-full", flip && (type === "horizontal" ? "rotate-y-180" : "rotate-x-180"))}>
            <ProgressBarContainer />
            <ProgressBarFill />
        </div>
    )
}

export function ProgressBarContainer(props: ContainerProps) {
    const { className, ...rest } = props;
    const { type, length, size }: ProgressBarProps = useProgressBar();
    return (
        <div {...rest} className={twMerge("overflow-hidden bg-neutral-200 rounded-full", className)} style={type === "horizontal" ? {
            width: `${length}rem`,
            height: `${size}rem`
        } : {
            width: `${size}rem`,
            height: `${length}rem`
        }} />
    );
}

export function ProgressBarFill(props: ContainerProps) {
    const { className, ...rest } = props;
    const { type, length, size, minValue, maxValue, value }: ProgressBarProps = useProgressBar();
    const val: number = useMemo(() => (value ? value : 0) - minValue, [value, minValue]);
    return (
        <div {...rest} className={twMerge("absolute top-0 bg-brand-500 rounded-full", className)} style={type === "horizontal" ? {
            width: `${size + ((val * length) / (maxValue - minValue))}rem`,
            height: `${size}rem`,
            transform: `translateX(-${size}rem)`
        } : {
            width: `${size}rem`,
            height: `${size + ((val * length) / (maxValue - minValue))}rem`,
            transform: `translateY(-${size}rem)`
        }} />
    );
}
