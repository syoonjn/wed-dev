import { memo } from "react";
import GuestBookPage from "../GuestBookPage";

function GuestBookSection() {
    return (
        <div className="border-t border-gray-200 py-10 px-4 w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
            <h1 className="text-xl font-bold text-center mb-8 text-abs-20">방명록</h1>
            <GuestBookPage />
        </div>
    );
}

export default memo(GuestBookSection);
