import { memo } from "react";
import DirectionsSection from "../DirectionsSection";

function DirectionsInfoSection() {
    return (
        <>
            <h1 className="text-xl text-center mb-2 text-abs-20 font-bold">오시는길</h1>
            <section className="mb-8">
                <DirectionsSection />
            </section>
        </>
    );
}

export default memo(DirectionsInfoSection);
