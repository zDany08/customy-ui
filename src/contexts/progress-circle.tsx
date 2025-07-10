import React, { createContext, useContext } from "react";
import { ProgressCircleProps } from "../components/progress-circle";

const ProgressCircleContext = createContext<ProgressCircleProps | undefined>(undefined);

export function ProgressCircleProvider({
    value,
    children
}: {
    value: ProgressCircleProps,
    children: React.ReactNode
}) {
    return (
        <ProgressCircleContext.Provider value={value}>
            {children}
        </ProgressCircleContext.Provider>
    );
}

export function useProgressCircle(): ProgressCircleProps {
    const ctx = useContext(ProgressCircleContext);
    if(!ctx) throw new Error("Please, use ProgressCircleContext with a ProgressCircleContext.Provider");
    return ctx;
}
