import { Modal } from "flowbite-react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import GuestBookForm from "./GuestBookForm";
import GuestBookList from "./GuestBookList";

export default function GuestBookPage() {
    const [openModal, setOpenModal] = useState(false);
    const [showAll, setShowAll] = useState(false);

    return (
        <div className="mb-4 text-center max-w-[600px] mx-auto">
            {/* 모달 여는 버튼 */}
            <div className="flex justify-center gap-2 mb-6">
                <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="flex items-center gap-1 rounded-md bg-black px-4 py-2 text-white text-sm sm:text-base hover:bg-gray-800"
                >
                    <FaBars className="w-4 h-4" />
                    {showAll ? "간략히 보기" : "전체보기"}
                </button>
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-1 rounded-md bg-black px-4 py-2 text-white text-sm sm:text-base hover:bg-gray-800"
                >
                    <HiMail className="w-4 h-4" />
                    작성하기
                </button>
            </div>

            {/* 모달 */}
            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
                className="[&_[role=dialog]]:!h-auto"
            >
                <div className="relative w-full max-w-2xl">
                    <Modal.Header className="text-center text-lg font-semibold">
                        축하 메시지 작성하기
                    </Modal.Header>
                    <Modal.Body>
                        <GuestBookForm closeModal={() => setOpenModal(false)} />
                    </Modal.Body>
                </div>
            </Modal>

            {/* 방명록 리스트 */}
            <GuestBookList showAll={showAll} />
        </div>
    );
}
