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
    <div className="absolute bottom-4 left-4 z-20 flex flex-row gap-2 items-end w-[250px] md:w-[250px]">
      <div className="flex flex-col gap-2 flex-1">
        <textarea
          ref={textareaRef}
          placeholder="Type me some feedback..."
          className="flex-1 p-1.5 text-sm rounded border border-black-400 text-orange-500 bg-black resize-none h-[60px] placeholder-yellow-500"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition self-end"
        >
          Send
        </button>
      </div>

    </div>
  );
}