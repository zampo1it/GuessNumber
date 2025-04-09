"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FeedbackBox from "@/components/FeedbackBox";

export default function ScoreboardPage() {
  const [scores, setScores] = useState<any[]>([]);
  const [lastScore, setLastScore] = useState<any | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState("hard");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const stored = localStorage.getItem("scoreboard");
    if (stored) {
      const parsed = JSON.parse(stored);
      setScores(parsed);
      setLastScore(parsed[parsed.length - 1]);
    }
  }, []);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredScores = scores.filter((s) => s.difficulty === difficultyFilter);

  const sortedScores = [...filteredScores].sort((a, b) => {
    if (!sortField) return 0;
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-10 py-10 relative">
      <Link
        href="/"
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
      >
        ← Go Back
      </Link>
      <br/><br/>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">🏆 Scoreboard</h1>

      {lastScore && (
        <div className="mb-8 p-4 border border-yellow-400 rounded bg-yellow-900 text-yellow-300 max-w-[600px] mx-auto">
          <h2 className="text-xl font-semibold mb-2">🕓 Last attempt</h2>
          <p>Attempts: {lastScore.attempts}</p>
          <p>Time: {lastScore.time} sec</p>
          <p className="text-sm text-yellow-200 mt-1 italic">{lastScore.date}</p>
          <p className="text-yellow-400 mt-1">Difficulty: {lastScore.difficulty}</p>
        </div>
      )}

      <div className="flex justify-center gap-4 mb-6">
        {['easy', 'medium', 'hard'].map((level) => (
          <button
            key={level}
            onClick={() => setDifficultyFilter(level)}
            className={`px-4 py-2 rounded font-bold transition ${
              difficultyFilter === level ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {sortedScores.length === 0 ? (
        <p className="text-center text-gray-400">No entries yet for this difficulty.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="flex justify-center">
            <table className="w-fit md:w-full md:max-w-[800px] border border-white text-left">
            <thead>
              <tr className="border-b border-white text-center">
                <th className="p-2">#</th>
                <th
                  className="p-2 cursor-pointer hover:text-yellow-400"
                  onClick={() => handleSort("attempts")}
                >
                  Attempts {sortField === "attempts" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="p-2 cursor-pointer hover:text-yellow-400"
                  onClick={() => handleSort("time")}
                >
                  Time (sec) {sortField === "time" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th
                  className="p-2 cursor-pointer hover:text-yellow-400"
                  onClick={() => handleSort("date")}
                >
                  Date {sortField === "date" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedScores.map((entry, index) => (
                <tr key={index} className="border-b border-white text-center">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{entry.attempts}</td>
                  <td className="p-2">{entry.time}</td>
                  <td className="p-2">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}


    </div>
  );
}
