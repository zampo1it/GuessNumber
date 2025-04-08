"use client";

export default function FeedbackBox() {
  return (
    <div className="absolute bottom-4 left-4 z-20 flex flex-col gap-2 w-[250px] md:w-[350px]">
      <textarea
        placeholder="Type me some feedback..."
        className="p-2 rounded border border-black-400 text-orange-500 bg-black resize-none h-[100px] w-full placeholder-yellow-500"
      />
      <button
        onClick={() => {
          const textarea = document.querySelector("textarea");
          if (textarea) {
            textarea.value = "";
            textarea.placeholder = "Your feedback has been sent to server! (not really)";
          }
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition self-end"
      >
        Send
      </button>
    </div>
  );
}