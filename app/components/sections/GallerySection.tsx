import { memo } from "react";
import ImageGallery from "../ImageGallery";

function GallerySection() {
    return (
        <div className="w-full px-2 sm:px-4 mt-5">
            <h1 className="text-xl font-bold text-center mb-2 text-abs-20">갤러리</h1>
            <ImageGallery />
        </div>
    );
}

export default memo(GallerySection);
