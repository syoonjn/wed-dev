import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import GuestBookForm from "./GeustBookForm";
import GuestBookList from "./GeustBookList";

export default function GuestBookPage() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="mb-4 text-center">
            {/* 모달을 여는 버튼 */}
            <Button
                className="bg-[#42382F] text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto mb-8"
                onClick={() => setOpenModal(true)}
            >
                <HiMail className="w-5 h-5" />
                축하 메시지 작성하기
            </Button>

            {/* 모달 */}
            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header className="text-lg font-semibold text-center">
                    축하 메시지 작성하기
                </Modal.Header>
                <Modal.Body>
                    <GuestBookForm closeModal={() => setOpenModal(false)} />
                </Modal.Body>
            </Modal>

            {/* 방명록 리스트 */}
            <GuestBookList />
        </div>
    );
}
