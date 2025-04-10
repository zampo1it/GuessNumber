"use client";

import React from "react";

type Props = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  attempts: number;
  time: number;
  difficulty: "easy" | "medium" | "hard";
  handleDifficultyChange: (level: "easy" | "medium" | "hard") => void;
  handleTryAgain: () => void;
  handleCheck: () => void;
  hintText: string;
  difficultyLevels: string[];
  difficultyRanges: {
    easy: string;
    medium: string;
    hard: string;
  };
};

const GameUI = ({
  inputValue,
  setInputValue,
  attempts,
  time,
  difficulty,
  handleDifficultyChange,
  handleTryAgain,
  handleCheck,
  hintText,
}: Props) => {
  const difficultyLevels = ["easy", "medium", "hard"] as const;
  const difficultyRanges: Record<typeof difficultyLevels[number], string> = {
    easy: "0-20",
    medium: "0-50",
    hard: "0-100",
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(onlyNumbers);
  };

  return (
    <div className="w-full px-4 flex flex-col items-center gap-3 pt-2 sm:pt-6">
      {/* Верхняя панель со статистикой */}
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
  {/* <div id="myNumberSwiper" className="number-swiper" data-value="">
    <ol className="number-swiper-column number-swiper-column-2" data-column="2">
      <li className="last-zero">0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li id="center-2" className="number-swiper-active-number">0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li className="last-zero">0</li>
    </ol>
    <ol className="number-swiper-column number-swiper-column-1" data-column="1">
      <li className="last-zero">0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li id="center-1" className="number-swiper-active-number">0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li className="last-zero">0</li>
    </ol>
    <input
      type="hidden"
      className="number-swiper-value"
      value={inputValue}
      readOnly
    />
  </div> */}

      {/* Уровни сложности */}
      <div className="flex justify-center gap-3 mt-2 w-full max-w-[400px]">
        {difficultyLevels.map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`w-full px-4 py-2 rounded-full font-bold shadow flex flex-col items-center ${
              difficulty === level
                ? "bg-yellow-500 text-black"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
            <span className="text-xs opacity-70 -mt-1">{difficultyRanges[level]}</span>
          </button>
        ))}
      </div>

      {/* Кнопки действий */}
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
};

export default GameUI;
