"use client";

import { useEffect, useRef, useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryAudioUrl } from "@/lib/cloudinary";

function NoteIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-4 w-4 ${spinning ? "animate-spin-slow" : ""}`}
    >
      <path d="M9 17V4.5a1 1 0 0 1 1.2-.98l8 1.6A1 1 0 0 1 19 6.1V17a3 3 0 1 1-2-2.83V7.62l-6-1.2v9.6A3 3 0 1 1 9 17Z" />
    </svg>
  );
}

export default function BgmPlayer() {
  const { bgm } = invitationConfig;
  const bgmUrl =
    bgm?.localUrl ?? (bgm?.publicId ? getCloudinaryAudioUrl(bgm.publicId) : null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!bgmUrl) return;
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // 브라우저 자동재생 정책으로 소리 있는 오디오는 대부분 차단됨.
          // 첫 사용자 터치/클릭 시 재시도(아래 리스너)해서 그때 재생 시작.
        });
    };

    tryPlay();

    const handleFirstInteraction = () => tryPlay();
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, {
      once: true,
    });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [bgmUrl]);

  if (!bgmUrl) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={bgmUrl} loop preload="auto" className="hidden" />

      {/* 480px 모바일 프레임 폭 안에 버튼이 위치하도록, Petals와 같은 방식으로 폭을 제한 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center">
        <div className="relative w-full max-w-[480px]">
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "배경음악 끄기" : "배경음악 켜기"}
            className="pointer-events-auto absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-ink/80 text-white shadow-lg backdrop-blur transition hover:bg-ink"
          >
            <NoteIcon spinning={isPlaying} />
          </button>
        </div>
      </div>
    </>
  );
}
