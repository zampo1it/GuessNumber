"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
      setLastScore(parsed[parsed.length - 1]); // последняя попытка
    }
  }, []);

  return (
    <><Link
      href="/"
      className="absolute top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
    >
      ← Go Back
    </Link><div className="min-h-screen bg-black text-white p-10">
        <br /><br /><br />
        <h1 className="text-3xl font-bold mb-6">🏆 Scoreboard</h1>

        {lastScore && (
          <div className="mb-8 p-4 border border-yellow-400 rounded bg-yellow-900 text-yellow-300">
            <h2 className="text-xl font-semibold mb-2">🕓 Last attempt</h2>
            <p>Attempts: {lastScore.attempts}</p>
            <p>Time: {lastScore.time} sec</p>
            <p className="text-sm text-yellow-200 mt-1 italic">
              {lastScore.date}
            </p>
          </div>
        )}

        {scores.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <table className="w-full border border-white text-left">
            <thead>
              <tr className="border-b border-white">
                <th className="p-2">#</th>
                <th className="p-2">Attempts</th>
                <th className="p-2">Time (sec)</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry, index) => (
                <tr key={index} className="border-b border-white">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{entry.attempts}</td>
                  <td className="p-2">{entry.time}</td>
                  <td className="p-2">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div></>
  );
}
