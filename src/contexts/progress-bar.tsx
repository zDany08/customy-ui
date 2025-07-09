import React, { createContext, useContext } from "react";
import { ProgressBarProps } from "../components/progress";

const ProgressBarContext = createContext<ProgressBarProps | undefined>(undefined);

export function ProgressBarProvider({
    value,
    children
}: {
    value: ProgressBarProps,
    children: React.ReactNode
}) {
    return (
        <ProgressBarContext.Provider value={value}>
            {children}
        </ProgressBarContext.Provider>
    );
}

export function useProgressBar(): ProgressBarProps {
    const ctx = useContext(ProgressBarContext);
    if(!ctx) throw new Error("Please, use ProgressBarContext with a ProgressBarContext.Provider");
    return ctx;
}
