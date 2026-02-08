"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
    // QueryClient는 클라이언트에서만 생성
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false, // ✅ 카카오톡 인앱브라우저 포커스 시 자동 refetch 방지
                    refetchOnReconnect: false,   // ✅ 네트워크 재연결 시 자동 refetch 방지
                    retry: 1,                     // ✅ 재시도 횟수 최소화
                    staleTime: 5 * 60 * 1000,    // ✅ 5분간 데이터 신선하게 유지
                },
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
