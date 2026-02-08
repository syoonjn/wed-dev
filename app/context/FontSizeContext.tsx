'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type FontSize = 'base' | 'lg' | 'xl';

interface FontSizeContextType {
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
    const [fontSize, setFontSizeState] = useState<FontSize>('base');
    const [mounted, setMounted] = useState(false);

    // 초기 로드 시 localStorage에서 값 불러오기
    useEffect(() => {
        const saved = localStorage.getItem('fontSize') as FontSize;
        if (saved && (saved === 'base' || saved === 'lg' || saved === 'xl')) {
            setFontSizeState(saved);
        }
        setMounted(true);
    }, []);

    const setFontSize = (size: FontSize) => {
        setFontSizeState(size);
        if (mounted) {
            localStorage.setItem('fontSize', size);
        }
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
