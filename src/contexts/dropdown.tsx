import React, { createContext, useContext } from "react";
import { DropdownProps } from "../components/dropdown";

const DropdownContext = createContext<DropdownProps | undefined>(undefined);

export function DropdownProvider({
    value,
    children
}: {
    value: DropdownProps,
    children: React.ReactNode
}) {
    return (
        <DropdownContext.Provider value={value}>
            {children}
        </DropdownContext.Provider>
    );
}

export function useDropdown(): DropdownProps {
    const ctx = useContext(DropdownContext);
    if(!ctx) throw new Error("Please, use DropdownContext with a DropdownContext.Provider");
    return ctx;
}
