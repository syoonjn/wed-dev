import { memo } from "react";
import Calendar from "../Calander";

function WeddingInfoSection() {
    return (
        <div className="flex flex-col items-center py-6 text-center">
            <h1 className="text-xl font-bold text-center mb-2 text-abs-20">예식 안내</h1>
            <Calendar />
        </div>
    );
}

export default memo(WeddingInfoSection);
