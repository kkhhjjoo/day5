"use client";

import { useEffect, useState } from "react";
import * as m from 'motion/react-m'

export const TypingEffect = ({
  text,
  typingSpeed = 150,
}: {
  text: string;
  typingSpeed?: number;
}) => {
  // 현재 입력된 텍스트
  const [displayText, setDisplayText] = useState("");
  // 현재 입력된 텍스트의 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => { 
    let timer: NodeJS.Timeout | undefined;
    if (currentIndex < text.length) { 
      timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed);
    }
    //클린업 함수 언제 실행?
    //1. 컴포넌트 언마운트 되기 진전 => 컴포넌트가 사라지기 직전에 정리하고 떠난다.
    //2. useEffect가 재실행되기 전
    return () => clearTimeout(timer)
  }, [currentIndex, text, typingSpeed])

  return (
    <div className="font-mono text-2xl">
      {/* 현재 입력된 텍스트 */}
      {displayText}
      {/* 깜빡거리는 타이핑 커서 */}
      <m.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{repeat: Infinity, duration: 0.8}}
        className="ml-1 inline-block h-5 w-2 bg-black" />
    </div>
  );
};

// 사용 예시
export default function TypingEffectExample() {
  return (
    <div className="p-8">
      <TypingEffect text="오늘은 러닝 어떤가요?" typingSpeed={100} />
    </div>
  );
}
