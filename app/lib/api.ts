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
    // ✅ 타임아웃 설정 (10초)
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('요청 시간 초과')), 10000)
    );

    const fetchPromise = supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });

    try {
        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]) as any;

        if (error) {
            throw new Error(error.message);
        }
        return data;
    } catch (err) {
        console.error('방명록 조회 실패:', err);
        throw err;
    }
}

export async function checkGuestId(id: number, password: string) {
    const { data, error } = await supabase
        .from("guestbook")
        .select("password")
        .eq("id", id)
        .maybeSingle();

    if (error) throw new Error("ID 조회 실패");

    if (!data) return;

    if (data.password !== password) return false;

    return true;
}


//삭제 로직
export async function deleteGuestBookRow(id: number) {
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;

    const { error } = await supabase.from("guestbook").delete().eq("id", numericId);
}
