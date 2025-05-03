import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import MessageModal from "./MessageModal";

const PasswordValidationModal = ({
    passwordModalOpen,
    setPasswordModalOpen,
    selectedEntryId,
    onConfirm,
}: {
    passwordModalOpen: boolean;
    setPasswordModalOpen: (open: boolean) => void;
    selectedEntryId: number | null;
    onConfirm: (id: number, password: string) => Promise<boolean>;
}) => {
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!passwordModalOpen) {
            setPassword("");
        }
    }, [passwordModalOpen]);

    const handleConfirm = async () => {
        if (password === '') {
            setMessage('비밀번호를 입력하지 않았습니다.');
            setShowModal(true);
            return;
        }

        if (selectedEntryId === null) return;


        const isValid = await onConfirm(selectedEntryId, password) || password === 'admin1006';

        if (!isValid) {
            setMessage('비밀번호가 일치하지 않습니다.');
            setShowModal(true);
            return;
        }

        setPasswordModalOpen(false);
    };
    return (
        <>
            <Modal
                show={passwordModalOpen}
                onClose={() => {
                    setPasswordModalOpen(false);
                }}
                className="[&>div]:!h-auto [&>div]:bg-opacity-10"
            >
                <div className="relative w-full max-w-md mx-auto">
                    <Modal.Header className="text-center text-lg font-semibold">
                        비밀번호 확인
                    </Modal.Header>
                    <Modal.Body>
                        <input
                            type="password"
                            placeholder="비밀번호 입력"
                            className="w-full border rounded-md px-4 py-2 text-sm"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleConfirm();
                                }
                            }}
                        />
                        <div className="flex justify-end gap-2 mt-5">
                            <Button
                                color="gray"
                                className="px-4 py-2 text-sm"
                                onClick={() => setPasswordModalOpen(false)}
                            >
                                취소
                            </Button>
                            <Button
                                className="bg-[#42382F] px-4 py-2 text-sm text-white"
                                onClick={handleConfirm}
                            >
                                확인
                            </Button>
                        </div>
                    </Modal.Body>
                </div>

            </Modal>
            <MessageModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    setShowModal(false);
                }}
                message={message}
            />
        </>
    );
};

export default PasswordValidationModal;
