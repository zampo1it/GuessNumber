"use client";

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

export default function Game() {
  const [inputValue, setInputValue] = useState("");
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [hintText, setHintText] = useState("Guess The Number");
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const clapAudio = typeof Audio !== "undefined" ? new Audio("/sounds/Winning_baloon.mp3") : null;
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("hard");

  const generateNumber = (level: "easy" | "medium" | "hard") => {
    switch (level) {
      case "easy": return Math.floor(Math.random() * 20) + 1;
      case "medium": return Math.floor(Math.random() * 50) + 1;
      default: return Math.floor(Math.random() * 100) + 1;
    }
  };

  const resetGameState = () => {
    setInputValue("");
    setHintText("Guess The Number");
    setAttempts(0);
    setTime(0);
    setTimerStarted(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleDifficultyChange = (level: "easy" | "medium" | "hard") => {
    setDifficulty(level);
    resetGameState();
    setRandomNumber(generateNumber(level));
  };

  const handleTryAgain = () => {
    resetGameState();
    setRandomNumber(generateNumber(difficulty));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(onlyNumbers);
  };

  const handleCheck = () => {
    if (!inputValue || !randomNumber) return;
    const userNumber = parseInt(inputValue, 10);
    setAttempts((prev) => prev + 1);
    if (!timerStarted) setTimerStarted(true);

    if (userNumber > 100) {
      setHintText("Too high!");
    } else if (userNumber > randomNumber) {
      setHintText("Try Lower");
    } else if (userNumber < randomNumber) {
      setHintText("Try Higher");
    } else {
      setHintText("🎉🎉🎉");
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      if (clapAudio) {
        clapAudio.currentTime = 0;
        clapAudio.play();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      const newScore = { attempts, time, difficulty, date: new Date().toLocaleString() };
      const stored = localStorage.getItem("scoreboard");
      const existing = stored ? JSON.parse(stored) : [];
      existing.push(newScore);
      localStorage.setItem("scoreboard", JSON.stringify(existing));
    }
  };

  useEffect(() => {
    setRandomNumber(generateNumber(difficulty));
  }, [difficulty]);

  useEffect(() => {
    if (timerStarted && !timerRef.current) {
      timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
  }, [timerStarted]);

  const difficultyLevels = ["easy", "medium", "hard"] as const;

  const difficultyRanges: Record<typeof difficultyLevels[number], string> = {
    easy: "0-20",
    medium: "0-50",
    hard: "0-100",
  };

  return (
    <div className="w-full px-4 flex flex-col items-center gap-3 pt-2 sm:pt-6">
      <div className="flex justify-between w-full max-w-[400px] mb-2">
        <div className="w-[48%] rounded-lg shadow overflow-hidden">
          <div className="bg-orange-700 text-xs text-yellow-100 font-bold text-center py-1">
            ATTEMPTS
          </div>
          <div className="bg-orange-400 text-2xl font-bold text-white text-center py-2">
            {attempts}
          </div>
        </div>
        <div className="w-[48%] rounded-lg shadow overflow-hidden">
          <div className="bg-red-800 text-xs text-red-100 font-bold text-center py-1">
            TIME
          </div>
          <div className="bg-red-500 text-2xl font-bold text-white text-center py-2">
            {time}s
          </div>
        </div>
      </div>

      <h1 className="text-[40px] md:text-[48px] text-yellow-400 font-serif font-bold text-center drop-shadow-md">
        {hintText}
      </h1>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Enter numbers only"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCheck();
        }}
        className="w-full max-w-[400px] text-center text-black placeholder-gray-500 bg-yellow-100 p-3 rounded-lg shadow-inner"
      />

      <div className="flex justify-center gap-3 mt-2 w-full max-w-[400px]">
        {difficultyLevels.map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`w-full px-4 py-2 rounded-full font-bold shadow flex flex-col items-center ${
              difficulty === level ? "bg-yellow-500 text-black" : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
            <span className="text-xs opacity-70 -mt-1">{difficultyRanges[level]}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-[400px] mt-2">
        <button
          onClick={handleCheck}
          className="w-full sm:w-auto px-6 py-3 bg-yellow-400 text-black rounded-lg font-bold text-lg shadow hover:bg-yellow-500"
        >
          CHECK
        </button>
        <button
          onClick={handleTryAgain}
          className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-white rounded-lg font-bold text-lg shadow hover:bg-gray-700"
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  );
}