'use client';

import { CookiesProvider } from 'react-cookie';

export default function ClientCookiesProvider({ children }: { children: React.ReactNode }) {
    console.log('child =>', children);
    return <CookiesProvider>{children}</CookiesProvider>;
}
