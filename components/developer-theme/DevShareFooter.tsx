"use client";

import { useState } from "react";
import Link from "next/link";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { shareKakaoCustom } from "@/lib/kakao";
import { useToast } from "@/components/providers/ToastProvider";
import Reveal from "@/components/ui/Reveal";
import TerminalWindow from "./TerminalWindow";

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
          className="flex w-full items-center justify-center rounded-lg py-3.5 text-sm font-bold transition hover:brightness-95 disabled:opacity-60"
          style={{
            backgroundColor: "var(--dev-accent-green)",
            color: "var(--dev-bg)",
          }}
        >
          $ ./share --invite
        </button>

        <Link
          href="/"
          className="mt-2 flex w-full items-center justify-center rounded-lg border py-2.5 text-xs transition hover:opacity-80"
          style={{
            borderColor: "var(--dev-border)",
            color: "var(--dev-text-dim)",
            backgroundColor: "var(--dev-bg-panel)",
          }}
        >
          👤 기본 버전으로 이동
        </Link>

        {/* 문구는 원본 사이트와 다른 소재(커널 모듈 대신 systemd 서비스)로 새로 작성함 */}
        <div className="mt-4">
          <TerminalWindow title="$ systemctl status marriage.service">
            <div
              className="space-y-1 text-[12px] leading-relaxed sm:text-sm"
              style={{ color: "var(--dev-text)" }}
            >
              <p style={{ color: "var(--dev-text-dim)" }}>
                $ sudo systemctl start marriage.service
              </p>
              <p style={{ color: "var(--dev-text-dim)" }}>
                $ systemctl status marriage.service
              </p>
              <p>
                <span style={{ color: "var(--dev-accent-green)" }}>●</span>{" "}
                marriage.service —{" "}
                <span style={{ color: "var(--dev-accent-green)" }}>
                  active (running)
                </span>
              </p>
              <p className="pl-4">
                Main PID: 2026 (
                <span style={{ color: "var(--dev-accent-yellow)" }}>
                  forever
                </span>
                )
              </p>
              <p className="pl-4">
                Status: &quot;hearts linked, uptime infinite&quot;
              </p>
              <p style={{ color: "var(--dev-text-dim)" }}>
                $ sudo systemctl stop marriage.service
              </p>
              <p style={{ color: "var(--dev-accent-orange)" }}>
                Failed to stop marriage.service: unit is protected and cannot
                be stopped.
              </p>
            </div>
          </TerminalWindow>
        </div>
      </Reveal>
    </section>
  );
}
