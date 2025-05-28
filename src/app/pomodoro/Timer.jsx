"use client";

import { useState, useEffect } from "react";
import {
  decrementTime,
  determineNextPeriod,
  restartPeriod,
} from "../services/timer";

const periods = {
  focus: { id: "focus", mins: 0, secs: 3 },
  shortBrk: { id: "short-break", mins: 0, secs: 1 },
  longBrk: { id: "long break", mins: 0, secs: 2 },
};

export default function Timer() {
  const initialPeriod = periods.focus;

  const [isRunning, setIsRunning] = useState(false);
  const [[mins, secs], setTime] = useState([
    initialPeriod.mins,
    initialPeriod.secs,
  ]);
  const [currentPeriod, setCurrentPeriod] = useState(initialPeriod);
  const [focusPeriodsCounter, setFocusPeriodsCounter] = useState(1);
  const [counter, setCounter] = useState(1);

  const nextPeriod = () => {
    setIsRunning(false);
    const nextPeriod = determineNextPeriod(currentPeriod, counter, periods);
    setCurrentPeriod(nextPeriod);
    setTime([nextPeriod.mins, nextPeriod.secs]);
    setCounter(counter + 1);
    if (nextPeriod.id == "focus") {
      setFocusPeriodsCounter(focusPeriodsCounter + 1);
    }
    if (counter === 7) {
      setCounter(0);
    }
  };

  useEffect(() => {
    if (!isRunning) return;
    const tick = () => decrementTime(mins, secs, setTime, nextPeriod);

    const timer = setTimeout(tick, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, mins, secs]);

  const startHandler = () => {
    setIsRunning(true);
  };

  const pauseHandler = () => {
    setIsRunning(false);
  };

  const goNextPeriodHandler = () => {
    nextPeriod();
  };

  const restartPeriodHandler = () => {
    restartPeriod(currentPeriod, setTime);
    setIsRunning(false);
  };

  return (
    <div className="bg-[#9FAF87] rounded-3xl p-8 w-[320px] md:w-[400px] text-center shadow-lg">
      <div className="flex justify-center mb-6 rounded-xl bg-[#F5F5F5] overflow-hidden w-[90%] mx-auto text-sm font-semibold">
        <div
          className={`w-1/3 py-1.5 text-center ${
            currentPeriod.id === "focus"
              ? "bg-[#9FAF87] text-white shadow-inner"
              : "text-[#9FAF87]"
          }`}
        >
          Pomodoro
        </div>
        <div
          className={`w-1/3 py-1.5 text-center ${
            currentPeriod.id === "short-break"
              ? "bg-[#9FAF87] text-white shadow-inner"
              : "text-[#9FAF87]"
          }`}
        >
          Short Break
        </div>
        <div
          className={`w-1/3 py-1.5 text-center ${
            currentPeriod.id === "long break"
              ? "bg-[#9FAF87] text-white shadow-inner"
              : "text-[#9FAF87]"
          }`}
        >
          Long Break
        </div>
      </div>
      <div className="text-[48px] font-bold text-[#F5F5F5] mb-2">
        {`${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`}
      </div>

      <div className="text-[#F5F5F5] font-semibold mb-6 text-lg">
        #{focusPeriodsCounter}
      </div>

      <div className="flex justify-between items-center gap-2 w-[100%] max-w-[300px] mx-auto">
        <button
          onClick={restartPeriodHandler}
          className="bg-[#F5F5F5] text-[#9FAF87] font-bold py-2 px-4 rounded-xl shadow-inner hover:shadow-md hover:translate-y-[1px] active:translate-y-[2px] active:shadow-sm transition-all duration-200 text-sm"
        >
          RESTART
        </button>

        {!isRunning ? (
          <button
            onClick={startHandler}
            className="bg-[#F5F5F5] text-[#9FAF87] font-bold py-2 px-6 rounded-xl shadow-inner hover:shadow-md hover:translate-y-[1px] active:translate-y-[2px] active:shadow-sm transition-all duration-200"
          >
            START
          </button>
        ) : (
          <button
            onClick={pauseHandler}
            className="bg-[#F5F5F5] text-[#9FAF87] font-bold py-2 px-6 rounded-xl shadow-inner hover:shadow-md hover:translate-y-[1px] active:translate-y-[2px] active:shadow-sm transition-all duration-200"
          >
            PAUSE
          </button>
        )}

        <button
          onClick={goNextPeriodHandler}
          className="bg-[#F5F5F5] text-[#9FAF87] font-bold py-2 px-4 rounded-xl shadow-inner hover:shadow-md hover:translate-y-[1px] active:translate-y-[2px] active:shadow-sm transition-all duration-200 text-sm"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
