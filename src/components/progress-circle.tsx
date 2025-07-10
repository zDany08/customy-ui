import React, { useMemo } from "react";
import { ProgressCircleProvider, useProgressCircle } from "../contexts/progress-circle";

export type ProgressCircleProps = {
    radius: number,
    size: number,
    minValue: number,
    maxValue: number,
    /**
     * Makes the fill circle rounded
     */
    roundedFill?: boolean,
    /**
     * Rotation to adapt every use case (degrees)
     */
    rotation?: number,
    value?: number
};

export function ProgressCircle(props: ProgressCircleProps) {
    return (
        <ProgressCircleProvider value={props}>
            <ProgressCircleContent />
        </ProgressCircleProvider>
    );
}

function ProgressCircleContent() {
    const { radius, rotation }: ProgressCircleProps = useProgressCircle();
    const diameter: number = useMemo(() => radius * 2, [radius]);
    return (
        <svg style={{
            transform: `rotateZ(${rotation ? rotation : 0}deg)`
        }} width={diameter} height={diameter}>
            <ProgressCircleContainer />
            <ProgressCircleFill />
        </svg>
    )
}

export type ProgressCircleContainerProps = React.SVGProps<SVGCircleElement>;

export function ProgressCircleContainer(props: ProgressCircleContainerProps) {
    const { radius, size }: ProgressCircleProps = useProgressCircle();
    return (
        <circle fill="transparent" stroke="#d4d4d4" {...props} r={radius - size} cx={radius} cy={radius} strokeWidth={size} />
    );
}

export function ProgressCircleFill(props: ProgressCircleContainerProps) {
    const { radius, size, minValue, maxValue, roundedFill, value }: ProgressCircleProps = useProgressCircle();
    const val: number = useMemo(() => (value ? value : 0) - minValue, [value, minValue]);
    const finalRadius: number = useMemo(() => radius - size, [radius, size]);
    const circumference: number = useMemo(() => 2 * Math.PI * finalRadius, [finalRadius]);
    const fill: number = useMemo(() => (val * circumference) / (maxValue - minValue), [val, circumference, maxValue]);
    return (
        <circle fill="transparent" stroke="#3ca7ea" {...props} r={finalRadius} cx={radius} cy={radius} strokeWidth={size} style={{
            strokeDasharray: `${fill} ${circumference - fill}`,
            strokeDashoffset: circumference / 4,
            strokeLinecap: roundedFill ? "round" : "initial"
        }} />
    );
}
