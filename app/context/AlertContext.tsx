// context/AlertContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import CustomAlert from "@/components/CustomAlert";

interface AlertContextType {
    showAlert: (message: string, type?: "success" | "info" | "warning" | "error") => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);

    const showAlert = (message: string, type: "success" | "info" | "warning" | "error" = "info") => {
        setAlert({ message, type });
    };

    const closeAlert = () => setAlert(null);

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            {alert && (
                <CustomAlert
                    message={alert.message}
                    type={alert.type as "success" | "info" | "warning" | "error"}
                    onClose={closeAlert}
                />
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
