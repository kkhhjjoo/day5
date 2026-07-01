"use client";

import { useState, useEffect } from "react";
import * as m from 'motion/react-m';

export const AnimatedProgressBar = ({ maxValue = 100, height = 12 }) => {
  // API 응답으로 받을 값을 저장할 상태
  const [value, setValue] = useState(0);
  // API 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // API 호출을 시뮬레이션 (실제로는 여기서 API 요청을 수행)
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 실제 API 호출 예시:
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // setValue(data.progressValue);

        // API 호출 시뮬레이션 (0.5초 ~ 2초 사이 지연)
        await new Promise((resolve) =>
          setTimeout(resolve, 500 + Math.random() * 1500),
        );

        // 랜덤 값으로 시뮬레이션 (실제로는 API 응답 데이터를 사용)
        const randomValue = Math.floor(Math.random() * 101); // 0 ~ 100 사이 랜덤 값;
        setValue(randomValue);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 퍼센트로 변환
	const percentage = (value / maxValue) * 100;

  return (
    <div className="w-full">
      {/* 프로그레스바 컨테이너 */}
      <div
        className="w-full overflow-hidden rounded-full bg-gray-200"
        style={{ height: `${height}px` }}
      >
        {!isLoading && <m.div
          initial={{ width: 0 }}
          animate={{width: `${ percentage }%`}}
          transition={{duration: 1.5, ease: "easeOut"}}
          className="h-full bg-blue-500" />}
      </div>

      {/* 로딩 및 값 표시 */}
      <div className="mt-2 text-right text-sm">
        {isLoading ? (
          <div className="animate-pulse text-gray-500">데이터 로딩 중...</div>
        ) : (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{opacity: 1, y:0}}
              className="font-medium text-blue-600">
            {value} / {maxValue} ({percentage.toFixed(1)}%)
          </m.div>
        )}
      </div>
    </div>
  );
};

// 여러 프로그레스바를 동시에 보여주는 예제 컴포넌트
const ProgressBarExample = () => {
  return (
    <div className="mx-auto max-w-xl space-y-8 p-6">
      <h2 className="mb-4 text-xl font-bold">
        API 데이터로 애니메이션되는 프로그레스바
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-medium">사용자 진행도</h3>
          <AnimatedProgressBar maxValue={100} height={12} />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-medium">다운로드 상태</h3>
          <AnimatedProgressBar maxValue={100} height={8} />
        </div>

        <div>
          <h3 className="mb-2 text-lg font-medium">시스템 리소스</h3>
          <AnimatedProgressBar maxValue={100} height={16} />
        </div>
      </div>
    </div>
  );
};

export default ProgressBarExample;
