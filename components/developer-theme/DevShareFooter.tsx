"use client";

import { useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { shareKakaoCustom } from "@/lib/kakao";
import { useToast } from "@/components/providers/ToastProvider";
import Reveal from "@/components/ui/Reveal";

function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.76 1.84 5.19 4.62 6.58-.2.73-.73 2.66-.84 3.07-.13.5.18.5.39.36.16-.11 2.6-1.77 3.66-2.49.71.1 1.44.15 2.17.15 5.52 0 10-3.48 10-7.8S17.52 3 12 3Z" />
    </svg>
  );
}

export default function DevShareFooter() {
  const { share, hero } = invitationConfig;
  const { showToast } = useToast();
  const [isSharing, setIsSharing] = useState(false);

  const handleShareKakao = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      await shareKakaoCustom(share.kakaoTemplateId, {
        imageUrl: getCloudinaryUrl(hero.backgroundImagePublicId, {
          width: 1200,
        }),
      });
    } catch (err) {
      console.error("카카오톡 공유 실패:", err);
      showToast("카카오톡 공유에 실패했습니다");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <section className="px-4 py-8 sm:px-6">
      <Reveal>
        <button
          type="button"
          onClick={handleShareKakao}
          disabled={isSharing}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] py-3.5 text-sm font-medium text-[#191919] transition hover:brightness-95 disabled:opacity-60"
        >
          <KakaoIcon />
          청첩장 공유하기
        </button>
      </Reveal>
    </section>
  );
}
