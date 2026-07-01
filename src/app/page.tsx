"use client";

import { useState, useEffect } from "react";
import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';

export const WordChangeAnimation = ({
  prefix,
  suffix,
  words,
  interval = 2000,
}: {
  prefix: string;
  suffix: string;
  words: string[];
  interval?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // currentIndex를 현재 단어 개수로 나눈 나머지를 구함
      // 단어가 4개라면 0, 1, 2, 3, 0, 1, 2, 3, ...
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className="flex h-12 items-center overflow-hidden text-2xl">
      <span>{prefix}</span>
      <div className="relative mx-2 inline-block w-12 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <m.span
            key={currentIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{duration: 0.5}}
            className="inline-block font-bold text-blue-600">
            {`${words[currentIndex]}`}
          </m.span>
        </AnimatePresence>
      </div>
      <span>{suffix}</span>
    </div>
  );
};

// 사용 예시
export default function WordChangeExample() {
  // 단어 목록
  const words = ["러닝", "게임", "볼링", "요가", "독서"];

  return (
    <div className="p-8">
      <WordChangeAnimation
        prefix="오늘은"
        suffix="어떤가요?"
        words={words}
        interval={2000}
      />
    </div>
  );
}
