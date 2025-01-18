import GuestBookForm from "./GeustBookForm";
import GuestBookList from "./GeustBookList";

export default function GuestBookPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold">방명록</h1>
            <GuestBookForm />
            <GuestBookList />
        </div>
    );
}