'use client';

import { CookiesProvider } from 'react-cookie';

export default function ClientCookiesProvider({ children }: { children: React.ReactNode }) {
    return <CookiesProvider>{children}</CookiesProvider>;
}
