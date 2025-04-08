"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FeedbackBox from "@/components/FeedbackBox";

type ScoreEntry = {
  attempts: number;
  time: number;
  date: string;
};

export default function ScoreboardPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [lastScore, setLastScore] = useState<ScoreEntry | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("scoreboard");
    if (stored) {
      const parsed = JSON.parse(stored);
      setScores(parsed);
      setLastScore(parsed[parsed.length - 1]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-10 py-10 relative">

      <Link
        href="/"
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
      >
        ← Go Back
      </Link>
      <br/>
      <br/>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">🏆 Scoreboard</h1>

      {lastScore && (
        <div className="mb-8 p-4 border border-yellow-400 rounded bg-yellow-900 text-yellow-300 max-w-[600px] mx-auto">
          <h2 className="text-xl font-semibold mb-2">🕓 Last attempt</h2>
          <p>Attempts: {lastScore.attempts}</p>
          <p>Time: {lastScore.time} sec</p>
          <p className="text-sm text-yellow-200 mt-1 italic">{lastScore.date}</p>
        </div>
      )}

      {scores.length === 0 ? (
        <p className="text-center text-gray-400">No entries yet.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="flex justify-center">
            <table className="w-fit md:w-full md:max-w-[800px] border border-white text-left">
              <thead>
                <tr className="border-b border-white">
                  <th className="p-2 text-center">#</th>
                  <th className="p-2 text-center">Attempts</th>
                  <th className="p-2 text-center">Time (sec)</th>
                  <th className="p-2 text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((entry, index) => (
                  <tr key={index} className="border-b border-white">
                    <td className="p-2 text-center whitespace-nowrap">{index + 1}</td>
                    <td className="p-2 text-center whitespace-nowrap">{entry.attempts}</td>
                    <td className="p-2 text-center whitespace-nowrap">{entry.time}</td>
                    <td className="p-2 text-center whitespace-nowrap">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <FeedbackBox />
    </div>
  );
}
