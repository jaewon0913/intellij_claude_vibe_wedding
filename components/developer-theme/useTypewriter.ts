"use client";

import { useEffect, useState } from "react";

/**
 * 문자열을 한 글자씩 타이핑하듯 보여주는 훅.
 * 글자마다 무작위 지연을 줘서 사람이 타이핑하는 느낌을 낸다.
 * 반환값: { text: 지금까지 찍힌 글자, done: 다 찍혔는지 여부 }
 */
export function useTypewriter(
  fullText: string,
  { startDelay = 0, minDelay = 14, maxDelay = 34 } = {}
) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(0);
    let cancelled = false;
    let index = 0;

    const typeNext = () => {
      if (cancelled) return;
      index += 1;
      setLength(index);
      if (index < fullText.length) {
        const delay = minDelay + Math.random() * (maxDelay - minDelay);
        setTimeout(typeNext, delay);
      }
    };

    const startTimer = setTimeout(typeNext, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [fullText, startDelay, minDelay, maxDelay]);

  return {
    text: fullText.slice(0, length),
    done: length >= fullText.length,
  };
}
