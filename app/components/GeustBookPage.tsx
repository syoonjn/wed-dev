import GuestBookForm from "./GeustBookForm";
import GuestBookList from "./GeustBookList";

import { Button, Alert, Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";

export default function GuestBookPage() {
    return (
                    <div className="mb-4">
                        <GuestBookForm />
                        <GuestBookList />
                    </div>
    );
}