import { memo } from "react";
import KakaoMarker from "../KakaoMarker";
import KakaoNavigation from "../KakaoNavigation";

function LocationSection() {
    return (
        <div className="border-t border-gray-200 py-10">
            <KakaoMarker />
            <KakaoNavigation />
        </div>
    );
}

export default memo(LocationSection);
