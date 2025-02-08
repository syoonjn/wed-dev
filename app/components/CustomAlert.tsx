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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 배경: Alert보다 낮은 z-index 설정 */}
            <div
                className="fixed inset-0 z-40 bg-black opacity-50"
                onClick={onClose} // 배경 클릭으로 닫히도록 설정
            ></div>
            {/* Alert: 배경보다 높은 z-index 설정 */}
            <div
                className={`relative z-50 w-96 rounded-lg border p-4 text-center shadow-lg ${
                    type === "success"
                        ? "border-green-400 bg-green-100 text-green-800"
                        : type === "info"
                            ? "border-blue-400 bg-blue-100 text-blue-800"
                            : type === "warning"
                                ? "border-yellow-400 bg-yellow-100 text-yellow-800"
                                : "border-red-400 bg-red-100 text-red-800"
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
