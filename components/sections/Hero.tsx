import Image from "next/image";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export default function Hero() {
  const { groomName, brideName, eventDateText, backgroundImagePublicId } =
    invitationConfig.hero;

  const backgroundUrl = getCloudinaryUrl(backgroundImagePublicId, {
    width: 1080,
  });

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-end overflow-hidden bg-ink">
      {/* 배경 이미지 (아직 실제 사진 업로드 전이면 accent-soft 톤으로 대체) */}
      <div className="absolute inset-0 bg-accent-soft">
        <Image
          src={backgroundUrl}
          alt={`${groomName} ${brideName} 결혼식 대표 사진`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
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
