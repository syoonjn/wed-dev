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
        <div>
            {scriptLoad ?
                <Map
                    center={{ lat: 36.7933843, lng: 127.1045231 }}
                    style={{ width: '400px', height: '400px' }}
                    level={3}>
                    <MapMarker
                        position={{ lat: 36.7933843, lng: 127.1045231 }}
                    ></MapMarker>
                </Map>
                :
                <div></div>
            }
        </div>
    )
}

export default KakaoMarker;