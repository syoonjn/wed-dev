// context/AlertContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert as FlowbiteAlert } from "flowbite-react";

interface AlertContextType {
    showAlert: (content: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");

    const showAlert = (message: string) => {
        setContent(message);
        setShow(true);
        setTimeout(() => setShow(false), 3000); // 3초 후 자동 닫힘
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {show && (
                <div className="fixed bottom-4 right-4 z-50">
                    <FlowbiteAlert color="info" onDismiss={() => setShow(false)}>
                        <span className="font-medium">{content}</span>
                    </FlowbiteAlert>
                </div>
            )}
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};