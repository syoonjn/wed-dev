'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type FontSize = 'base' | 'lg' | 'xl';

interface FontSizeContextType {
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

// ✅ 초기값을 함수로 계산하여 리렌더 방지
const getInitialFontSize = (): FontSize => {
    if (typeof window === 'undefined') return 'base';
    const saved = localStorage.getItem('fontSize') as FontSize;
    return (saved === 'base' || saved === 'lg' || saved === 'xl') ? saved : 'base';
};

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
    const [fontSize, setFontSizeState] = useState<FontSize>(getInitialFontSize);

    const setFontSize = (size: FontSize) => {
        setFontSizeState(size);
        localStorage.setItem('fontSize', size);
    };

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
