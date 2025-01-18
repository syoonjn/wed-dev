import { Button } from "flowbite-react";

export default function CustomAlert({
                                        message,
                                        onClose,
                                        type = "info",
                                    }: {
    message: string;
    onClose: () => void;
    type?: "success" | "info" | "warning" | "error";
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* 배경: Alert보다 낮은 z-index 설정 */}
            <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={onClose} // 배경 클릭으로 닫히도록 설정
            ></div>
            {/* Alert: 배경보다 높은 z-index 설정 */}
            <div
                className={`relative z-50 w-96 border p-4 rounded-lg shadow-lg text-center ${
                    type === "success"
                        ? "bg-green-100 text-green-800 border-green-400"
                        : type === "info"
                            ? "bg-blue-100 text-blue-800 border-blue-400"
                            : type === "warning"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-400"
                                : "bg-red-100 text-red-800 border-red-400"
                }`}
            >
                <p className="mb-4">{message}</p>
                <Button
                    onClick={onClose}
                >
                    확인
                </Button>
            </div>
        </div>
    );
}
