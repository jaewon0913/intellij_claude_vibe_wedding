"use client";

import { useEffect, useRef } from "react";
import { invitationConfig } from "@/config/invitation.config";
import { loadKakaoMapsScript } from "@/lib/kakao";
import TerminalWindow from "./TerminalWindow";

export default function DevLocation() {
  const { address, venueName, lat, lng } = invitationConfig.location;
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

  return (
    <section className="px-4 py-6 sm:px-6">
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
            <span style={{ color: "var(--dev-accent-blue)" }}>address</span> ={" "}
            {address}
          </p>
        </div>

        <div
          ref={mapContainerRef}
          className="mt-3 h-56 w-full overflow-hidden rounded border"
          style={{ borderColor: "var(--dev-border)" }}
        />

        <a
          href={kakaoMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded border px-3 py-1.5 text-xs transition hover:opacity-80"
          style={{
            borderColor: "var(--dev-border)",
            color: "var(--dev-accent-green)",
          }}
        >
          $ open ./directions --app=kakaomap
        </a>
      </TerminalWindow>
    </section>
  );
}
