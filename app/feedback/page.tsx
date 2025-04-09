"use client";

import Link from "next/link";
import FeedbackBox from "@/components/FeedbackBox";

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-10 py-10 relative">
      <Link
        href="/"
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
      >
        ← Go Back
      </Link>
        <br/><br/>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">💬 Leave Feedback</h1>

      <div className="max-w-[600px] mx-auto mt-10">
        <FeedbackBox />
      </div>
    </div>
  );
}
