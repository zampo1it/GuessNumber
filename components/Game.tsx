"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import GameUI from "./GameUI";

export default function Game() {
  const [inputValue, setInputValue] = useState("0");
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
      case "easy":
        return Math.floor(Math.random() * 21);
      case "medium":
        return Math.floor(Math.random() * 51);
      default:
        return Math.floor(Math.random() * 101);
    }
  };

  const resetGameState = () => {
    setInputValue("0");
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

  const handleCheck = () => {
    if (!inputValue || !randomNumber) return;
    const userNumber = parseInt(inputValue, 10);
    setAttempts((prev) => prev + 1);
    if (!timerStarted) setTimerStarted(true);
    console.log("userNumber", userNumber, "randomNumber", randomNumber);
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
      const newScore = {
        attempts,
        time,
        difficulty,
        date: new Date().toLocaleString(),
      };
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

  // 👇 Правильная динамическая загрузка number-swiper.js
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/number-picker-swiper/number-swiper.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <GameUI
      inputValue={inputValue}
      setInputValue={setInputValue}
      attempts={attempts}
      time={time}
      difficulty={difficulty}
      handleDifficultyChange={handleDifficultyChange}
      handleTryAgain={handleTryAgain}
      handleCheck={handleCheck}
      hintText={hintText} difficultyLevels={["easy", "medium", "hard"]} difficultyRanges={{ easy: "0-20", medium: "0-50", hard: "0-100" }}    />
  );
}
