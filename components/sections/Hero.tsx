"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl, getCloudinaryVideoUrl } from "@/lib/cloudinary";

export default function Hero() {
  const {
    groomName,
    brideName,
    eventDateText,
    backgroundImagePublicId,
    backgroundImageUrl,
    backgroundVideoPublicId,
  } = invitationConfig.hero;

  // Cloudinary 연결 전까지는 public/images의 로컬 이미지를 우선 사용
  const backgroundUrl =
    backgroundImageUrl ??
    getCloudinaryUrl(backgroundImagePublicId, { width: 1080 });

  const backgroundVideoUrl = backgroundVideoPublicId
    ? getCloudinaryVideoUrl(backgroundVideoPublicId, { width: 1080 })
    : null;

  const videoRef = useRef<HTMLVideoElement>(null);
  // 실제로 영상 로드/재생이 실패했을 때만 이미지로 폴백 (기본은 항상 비디오 우선)
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (!backgroundVideoUrl) return;
    const video = videoRef.current;
    if (!video) return;

    // 일부 모바일 브라우저는 autoPlay/muted "속성"만으로는 자동재생을 시작하지 않고
    // JS로 muted를 다시 명시하고 play()를 직접 호출해줘야 안정적으로 재생된다.
    video.muted = true;

    const tryPlay = () => {
      video.play().catch(() => {
        // 저전력 모드 등으로 자동재생이 막힌 경우 조용히 무시.
        // 데이터 로드 완료/탭 복귀 시 재시도하므로 대부분 곧 재생됨.
      });
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [backgroundVideoUrl]);

  const showVideo = Boolean(backgroundVideoUrl) && !videoFailed;

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-end overflow-hidden bg-ink">
      {/* 배경: 비디오가 있으면 항상 비디오를 우선 노출, 로드/재생 실패시에만 이미지로 폴백 */}
      <div className="absolute inset-0 bg-accent-soft">
        {showVideo ? (
          <video
            ref={videoRef}
            key={backgroundVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={backgroundUrl}
            onError={() => setVideoFailed(true)}
            className="h-full w-full object-cover"
          >
            <source src={backgroundVideoUrl!} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={backgroundUrl}
            alt={`${groomName} ${brideName} 결혼식 대표 사진`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* 가독성을 위한 어두운 그라데이션 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {/* 본문 */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-24 text-center text-white">
        <p className="animate-fade-in-up text-xs tracking-[0.35em] text-white/80">
          THE WEDDING OF
        </p>

        <h1
          className="animate-fade-in-up mt-5 font-serif text-4xl tracking-wide sm:text-5xl"
          style={{ animationDelay: "0.15s" }}
        >
          {groomName} <span className="mx-2 text-white/60">&amp;</span>{" "}
          {brideName}
        </h1>

        <p
          className="animate-fade-in-up mt-6 text-sm tracking-widest text-white/90"
          style={{ animationDelay: "0.3s" }}
        >
          {eventDateText}
        </p>
      </div>

      {/* 스크롤 유도 인디케이터 */}
      <div className="relative z-10 mb-8 flex flex-col items-center gap-2 text-white/80">
        <span className="text-[11px] tracking-[0.3em]">SCROLL</span>
        <svg
          className="h-4 w-4 animate-bounce"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            d="M12 4v14m0 0l-5-5m5 5l5-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
