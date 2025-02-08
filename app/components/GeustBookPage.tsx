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
                className="mx-auto mb-8 flex items-center gap-2 rounded-lg bg-[#42382F] px-6 py-3 text-white"
                onClick={() => setOpenModal(true)}
            >
                <HiMail className="size-5" />
                축하 메시지 작성하기
            </Button>

            {/* 모달 */}
            <Modal
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header className="text-center text-lg font-semibold">
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
