'use client';

import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMarker = () => {
    const apiKey:string|undefined = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    const [scriptLoad, setScriptLoad] = useState<boolean>(false);

    useEffect(() => {
        const script:HTMLScriptElement = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        document.head.appendChild(script);

        script.addEventListener("load", () => {
            setScriptLoad(true);
        })
    }, []);

    return (
        <div className="mt-4 flex w-full flex-col items-center justify-center">
            {scriptLoad ? (
                <Map
                    center={{ lat: 36.7933843, lng: 127.1045231 }}
                    style={{ width: '100%', maxWidth: '500px', height: '300px', borderRadius: '10px' }}
                    level={4}
                >
                    <MapMarker position={{ lat: 36.7933843, lng: 127.1045231 }} />
                </Map>
            ) : (
                <div className="flex h-[300px] w-full max-w-[500px] items-center justify-center bg-gray-300">
                    <p>지도를 불러오는 중...</p>
                </div>
            )}
        </div>

    )
}

export default KakaoMarker;