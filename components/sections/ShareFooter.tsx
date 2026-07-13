"use client";

import { useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { shareKakao } from "@/lib/kakao";
import { useToast } from "@/components/providers/ToastProvider";

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.76 1.84 5.19 4.62 6.58-.2.73-.73 2.66-.84 3.07-.13.5.18.5.39.36.16-.11 2.6-1.77 3.66-2.49.71.1 1.44.15 2.17.15 5.52 0 10-3.48 10-7.8S17.52 3 12 3Z" />
    </svg>
  );
}

export default function ShareFooter() {
  const { share, meta, hero, closing } = invitationConfig;
  const { showToast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const getCurrentUrl = () =>
    typeof window !== "undefined" ? window.location.href : meta.siteUrl;

  const handleShareKakao = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      const url = getCurrentUrl();
      await shareKakao({
        title: share.kakaoTitle,
        description: share.kakaoDescription,
        imageUrl: getCloudinaryUrl(hero.backgroundImagePublicId, {
          width: 800,
          height: 400,
          crop: "fill",
        }),
        link: { mobileWebUrl: url, webUrl: url },
      });
    } catch (err) {
      console.error("카카오톡 공유 실패:", err);
      showToast("카카오톡 공유에 실패했습니다");
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentUrl());
      showToast("링크가 복사되었습니다");
    } catch (err) {
      console.error("링크 복사 실패:", err);
    }
  };

  return (
    <section className="bg-paper px-6 pb-16 pt-8 sm:px-10">
      <div className="mx-auto max-w-md">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleShareKakao}
            disabled={isSharing}
            className="flex items-center justify-center gap-2 rounded-full bg-[#FEE500] py-3.5 text-sm font-medium text-[#191919] transition hover:brightness-95 disabled:opacity-60"
          >
            <KakaoIcon />
            청첩장 공유하기
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="rounded-full border border-line py-3 text-sm text-ink-light transition hover:border-accent hover:text-accent"
          >
            링크 복사
          </button>
        </div>

        <p className="mt-10 text-center text-sm leading-relaxed text-ink-light">
          {closing.message}
        </p>
      </div>
    </section>
  );
}
