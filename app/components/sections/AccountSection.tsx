import { memo } from "react";
import AccountList from "../AccountList";

function AccountSection() {
    return (
        <div className="border-t border-gray-200 py-10 px-4 w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] mx-auto">
            <h1 className="text-xl font-bold text-center mb-8 text-abs-20">마음 전하실 곳</h1>
            <AccountList />
        </div>
    );
}

export default memo(AccountSection);
