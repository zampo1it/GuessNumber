"use client";

import { useRef } from "react";

export default function FeedbackBox() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.placeholder = "Your feedback has been sent to server! (not really)";
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[400px] mx-auto">
      <textarea
        ref={textareaRef}
        placeholder="Type me some feedback..."
        className="p-1.5 text-sm rounded border border-black-400 text-orange-500 bg-black resize-none h-[60px] w-full placeholder-yellow-500"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition self-end"
      >
        Send
      </button>
    </div>
  );
}
