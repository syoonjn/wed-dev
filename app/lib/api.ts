import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 데이터 삽입 함수
export async function insertGuestBookEntry({
                                               name,
                                               password,
                                               contents,
                                           }: {
    name: string;
    password: string;
    contents: string; // contents로 변경
}): Promise<any> {
    const { data, error } = await supabase
        .from("guestbook")
        .insert([{ name, password, contents }]); // 여기서도 contents로 변경

    if (error) {
        throw new Error(error.message);
    }
    return data;
}

// 데이터 조회 함수
export async function fetchGuestBookEntries() {
    const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        // .order("id", { ascending: false }); // 최신 항목부터 정렬

    if (error) {
        throw new Error(error.message);
    }
    return data;
}
