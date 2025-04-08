"use client";

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

export default function Game() {
  const [inputValue, setInputValue] = useState("");
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [hintText, setHintText] = useState("↓↓↓↓");
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const clapAudio = typeof Audio !== "undefined" ? new Audio("/sounds/Winning_baloon.mp3") : null;
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("hard");

  const generateNumber = () => {
    switch (difficulty) {
      case "easy": return Math.floor(Math.random() * 20) + 1;
      case "medium": return Math.floor(Math.random() * 50) + 1;
      default: return Math.floor(Math.random() * 100) + 1;
    }
  };

  const resetGameState = () => {
    setInputValue("");
    setHintText("↓↓↓↓");
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
    setRandomNumber(generateNumber());
  };

  const handleTryAgain = () => {
    resetGameState();
    setRandomNumber(generateNumber());
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
      const newScore = { attempts, time, date: new Date().toLocaleString() };
      const stored = localStorage.getItem("scoreboard");
      const existing = stored ? JSON.parse(stored) : [];
      existing.push(newScore);
      localStorage.setItem("scoreboard", JSON.stringify(existing));
    }
  };

  useEffect(() => {
    setRandomNumber(generateNumber());
  }, []);

  useEffect(() => {
    if (timerStarted && !timerRef.current) {
      timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
  }, [timerStarted]);

  return (
    <div className="w-full px-4 flex flex-col items-center gap-6">
      <div className="w-full max-w-[600px] mx-auto flex flex-col items-center gap-4 text-center">
        <h1 className="text-[36px] md:text-[64px] text-white break-words leading-tight">{hintText}</h1>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter numbers only"
          value={inputValue}
          onChange={handleChange}
          className="w-full max-w-[400px] p-3 rounded border border-gray-400 text-gray-800 bg-white"
        />

        <div className="flex flex-wrap justify-center gap-4 text-sm text-white">
          {(["easy", "medium", "hard"] as const).map((level) => (
            <label key={level} className="flex items-center gap-2">
              <input
                type="radio"
                value={level}
                checked={difficulty === level}
                onChange={() => handleDifficultyChange(level)}
                className="accent-blue-500"
              />
              {level.charAt(0).toUpperCase() + level.slice(1)} ({
                level === "easy" ? "1–20" : level === "medium" ? "1–50" : "1–100"
              })
            </label>
          ))}
        </div>

        <p className="text-white">Attempts: {attempts}</p>
        <p className="text-white">Time: {time} sec</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-[400px]">
          <button onClick={handleCheck} className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded hover:bg-blue-600 transition border border-black">
            Check
          </button>
          <button onClick={handleTryAgain} className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded hover:bg-red-500 transition border border-black">
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}