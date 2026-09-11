"use client";

import { useEffect, useRef } from "react";
import { invitationConfig } from "@/config/invitation.config";
import { loadKakaoMapsScript } from "@/lib/kakao";
import TerminalWindow from "./TerminalWindow";
import Reveal from "@/components/ui/Reveal";

function InfoBlock({
  icon,
  label,
  enLabel,
  color,
  lines,
}: {
  icon: string;
  label: string;
  enLabel: string;
  color: string;
  lines?: string[];
}) {
  if (!lines || lines.length === 0) return null;
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-xs" style={{ color: "var(--dev-text-dim)" }}>
        {"# "}
        {icon} {label} — {enLabel}
      </p>
      <div
        className="mt-1 space-y-0.5 text-[13px] leading-relaxed sm:text-sm"
        style={{ color }}
      >
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default function DevLocation() {
  const { address, venueName, lat, lng, transitInfo, shuttleInfo, parkingInfo } =
    invitationConfig.location;
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadKakaoMapsScript()
      .then(() => {
        if (cancelled || !mapContainerRef.current) return;
        const { kakao } = window;
        const center = new kakao.maps.LatLng(lat, lng);
        const map = new kakao.maps.Map(mapContainerRef.current, {
          center,
          level: 3,
        });
        new kakao.maps.Marker({ position: center, map });
      })
      .catch((err) => console.error(err));
    return () => {
      cancelled = true;
    };
  }, [lat, lng]);

  const kakaoMapLink = `https://map.kakao.com/link/to/${encodeURIComponent(venueName)},${lat},${lng}`;
  const naverMapLink = `https://map.naver.com/p/search/${encodeURIComponent(venueName)}`;
  const tmapLink = `tmap://route?goalname=${encodeURIComponent(venueName)}&goalx=${lng}&goaly=${lat}`;

  return (
    <section className="px-4 py-6 sm:px-6">
      <Reveal>
        <TerminalWindow title="$ cat location.txt">
          <div
            className="text-[13px] leading-relaxed sm:text-sm"
            style={{ color: "var(--dev-text)" }}
          >
            <p>
              <span style={{ color: "var(--dev-accent-blue)" }}>venue</span> ={" "}
              {venueName}
            </p>
            <p>
              <span style={{ color: "var(--dev-accent-blue)" }}>address</span>{" "}
              = {address}
            </p>
          </div>

          <div
            ref={mapContainerRef}
            className="mt-3 h-56 w-full overflow-hidden rounded border"
            style={{ borderColor: "var(--dev-border)" }}
          />

          <div className="mt-3 grid grid-cols-3 gap-2">
            <a
              href={kakaoMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border px-2 py-2 text-center text-[11px] transition hover:opacity-80"
              style={{
                borderColor: "var(--dev-border)",
                color: "var(--dev-text)",
              }}
            >
              카카오맵
            </a>
            <a
              href={naverMapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border px-2 py-2 text-center text-[11px] transition hover:opacity-80"
              style={{
                borderColor: "var(--dev-border)",
                color: "var(--dev-text)",
              }}
            >
              네이버 지도
            </a>
            <a
              href={tmapLink}
              className="rounded border px-2 py-2 text-center text-[11px] transition hover:opacity-80"
              style={{
                borderColor: "var(--dev-border)",
                color: "var(--dev-text)",
              }}
            >
              티맵
            </a>
          </div>
        </TerminalWindow>

        {(transitInfo || shuttleInfo) && (
          <div className="mt-3">
            <TerminalWindow title="$ cat transit.txt">
              <InfoBlock
                icon="🚇"
                label="지하철"
                enLabel="subway"
                color="var(--dev-accent-green)"
                lines={transitInfo}
              />
              <InfoBlock
                icon="🚌"
                label="버스"
                enLabel="bus"
                color="var(--dev-accent-blue)"
                lines={shuttleInfo}
              />
            </TerminalWindow>
          </div>
        )}

        {parkingInfo && parkingInfo.length > 0 && (
          <div className="mt-3">
            <TerminalWindow title="$ cat parking.txt">
              <InfoBlock
                icon="🚗"
                label="주차 안내"
                enLabel="parking"
                color="var(--dev-accent-orange)"
                lines={parkingInfo}
              />
            </TerminalWindow>
          </div>
        )}
      </Reveal>
    </section>
  );
}
