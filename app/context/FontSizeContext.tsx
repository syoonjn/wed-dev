'use client';
import React, { createContext, useContext, useState } from 'react';

type FontSize = 'base' | 'lg' | 'xl';

interface FontSizeContextType {
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
    const [fontSize, setFontSize] = useState<FontSize>('base');

    return (
        <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => {
    const context = useContext(FontSizeContext);
    if (!context) throw new Error('useFontSize must be used within FontSizeProvider');
    return context;
};
