import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiMail } from "react-icons/hi";
import GuestBookForm from "./GuestBookForm";
import GuestBookList from "./GuestBookList";

export default function GuestBookPage() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="mb-4 text-center max-w-[600px] mx-auto">
            {/* 모달을 여는 버튼 */}
            <Button
                className="mx-auto mb-6 flex items-center gap-2 rounded-md bg-[#42382F] px-4 py-2 text-sm text-white sm:text-base hover:bg-[#2e251f]"
                onClick={() => setOpenModal(true)}
            >
                <HiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                축하 메시지 작성하기
            </Button>


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
            <GuestBookList />
        </div>
    );
}
