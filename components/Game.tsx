"use client";

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

export default function Game() {
    const [inputValue, setInputValue] = useState("");
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const [hintText, setHintText] = useState("↓ ↓ ↓ ↓ ↓");
    const [attempts, setAttempts] = useState(0);
    const [time, setTime] = useState(0);
    const [timerStarted, setTimerStarted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null); // I'm not sure
    const clapAudio = typeof Audio !== "undefined" ? new Audio("/sounds/Winning_baloon.mp3") : null;
    const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("hard");



    useEffect(() => {
      const generated = generateNumber();
      setRandomNumber(generated);
      console.log("Cheat mode: ", generated);
    }, []);

    useEffect(() => {
        if (timerStarted && !timerRef.current) {
          timerRef.current = setInterval(() => {
            setTime((prev) => prev + 1);
          }, 1000);
        }
      }, [timerStarted]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
        setInputValue(onlyNumbers);
    };

    const generateNumber = () => {
      switch (difficulty) {
        case "easy":
          return Math.floor(Math.random() * 20) + 1;
        case "medium":
          return Math.floor(Math.random() * 50) + 1;
        case "hard":
        default:
          return Math.floor(Math.random() * 100) + 1;
      }
    };

    const BasicParams = () => {
      setInputValue("");
      setHintText("↓ ↓ ↓ ↓ ↓");
      setAttempts(0);
      setTime(0);
      setTimerStarted(false);
    };

    const handleDifficultyChange = (level: "easy" | "medium" | "hard") => {
      setDifficulty(level);
      BasicParams();
      setRandomNumber(generateNumber());
    
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const handleTryAgain = () => {
      setRandomNumber(generateNumber());
      BasicParams();
      
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };

    const handleCheck = () => {
        if (!inputValue || !randomNumber) return;
      
        const userNumber = parseInt(inputValue, 10);
        setAttempts((prev) => prev + 1);
      
        if (!timerStarted) setTimerStarted(true);
      
        if (userNumber > 100) {
          setHintText("Too high!!");
        } else if (userNumber > randomNumber) {
          setHintText("Try Lower");
        } else if (userNumber < randomNumber) {
          setHintText("Try Higher");
        } else {
          setHintText("🎉🎉🎉");
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          if (clapAudio) {
            clapAudio.currentTime = 0; 
            clapAudio.play();
          }

          const newScore = {
            attempts,
            time,
            date: new Date().toLocaleString(),
          };
        
          const stored = localStorage.getItem("scoreboard");
          const existing = stored ? JSON.parse(stored) : [];
          existing.push(newScore);
          localStorage.setItem("scoreboard", JSON.stringify(existing));
        }
      };

    return (
        <div className="flex flex-col gap-3 items-center relative">
            <h1 className="text-[80px] text-white max-w-[500px] text-center">{hintText}</h1>
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter numbers only"
                value={inputValue}
                onChange={handleChange}
                className="text-[16px] text-gray-200 md:text-gray-400 mb-2 max-w-[400px] p-2 border border-gray-400 rounded bg-white"
            />
 <div className="text-white mb-4 flex gap-4">
  <label className="flex items-center gap-1">
    <input
      type="radio"
      value="easy"
      checked={difficulty === "easy"}
      onChange={() => handleDifficultyChange("easy")}
      className="accent-green-500"
    />
    Easy (1–20)
  </label>
  <label className="flex items-center gap-1">
    <input
      type="radio"
      value="medium"
      checked={difficulty === "medium"}
      onChange={() => handleDifficultyChange("medium")}
      className="accent-yellow-500"
    />
    Medium (1–50)
  </label>
  <label className="flex items-center gap-1">
    <input
      type="radio"
      value="hard"
      checked={difficulty === "hard"}
      onChange={() => handleDifficultyChange("hard")}
      className="accent-red-500"
    />
    Hard (1–100)
  </label>
</div>
            <p className="text-white text-lg">Attempts: {attempts}</p>
            <p className="text-white text-lg">Time: {time} sec</p>
            <div className="flex gap-4">
                <button
                    onClick={handleCheck}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-blue-600 transition border border-black"
                >
                    Check
                </button>
                <button
                    onClick={handleTryAgain}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-red-500 transition border border-black"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}