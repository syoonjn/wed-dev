"use client";
import Image from "next/image";
import React from "react";

import { basePath } from '../next.config';
import { Button, DarkThemeToggle } from "flowbite-react";


const Home: React.FC = () => {
  return (
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
    <div className="min-h-screen bg-white dark:text-white flex flex-col items-center justify-center">
      <DarkThemeToggle />
      <header className="w-full max-w-5xl px-4 py-6 dark:text-white text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">You're Invited</h1>
        <p className="text-2xl dark:text-white text-gray-600">
          Celebrate the beginning of a beautiful journey.
        </p>
      </header>

      <main className="w-full max-w-3xl px-4 text-center">
        <div className="py-10 border-t border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">[Name & Name]</h2>
          <p className="text-lg font-medium text-gray-700">January 17, 2025</p>
          <p className="text-lg font-medium text-gray-700">Seoul, Korea</p>
        </div>

        <div className="py-10">
          <Button>
            RSVP Now
          </Button>
        </div>
      </main>

      <footer className="w-full max-w-5xl px-4 py-6 text-center border-t border-gray-200">
        <p className="text-sm text-gray-500">We look forward to celebrating with you!</p>
      </footer>
    </div>
  </main>
  );
};

export default Home;

