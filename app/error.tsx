"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-gray-100">
          Error
        </h1>

        <h2 className="mb-4 text-3xl font-semibold text-gray-700 dark:text-gray-300">
          Oops! Something went wrong
        </h2>

        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
          Try Refreshing your page or come back later.
        </p>

        <Link
          href="/"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
