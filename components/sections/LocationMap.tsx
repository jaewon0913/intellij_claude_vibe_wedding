"use client";

import { useEffect, useRef } from "react";
import { invitationConfig } from "@/config/invitation.config";
import { loadKakaoMapsScript } from "@/lib/kakao";
import { useToast } from "@/components/providers/ToastProvider";

export default function LocationMap() {
  const { address, venueName, lat, lng, parkingInfo, transitInfo, shuttleInfo } =
    invitationConfig.location;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

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
      .catch((err) => {
        console.error(err);
      });

    return () => {
      cancelled = true;
    };
  }, [lat, lng]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      showToast("주소가 복사되었습니다");
    } catch (err) {
      console.error("주소 복사 실패:", err);
    }
  };

  const kakaoMapLink = `https://map.kakao.com/link/to/${encodeURIComponent(
    venueName
  )},${lat},${lng}`;
  const naverMapLink = `https://map.naver.com/p/directions/-/3za8aE,2AIuEt,${venueName},/-/car?c=14.00,0,0,0,dh`;
  const tmapLink = `tmap://route?goalname=${encodeURIComponent(
    venueName
  )}&goalx=${lng}&goaly=${lat}`;

  return (
    <section id="location" className="bg-paper px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-md">
        <p className="text-center text-xs tracking-[0.35em] text-accent">
          LOCATION
        </p>
        <h2 className="mt-4 text-center font-serif text-2xl text-ink">
          오시는 길
        </h2>

        <div
          ref={mapContainerRef}
          className="mt-8 h-72 w-full overflow-hidden rounded-2xl border border-line bg-accent-soft"
        />

        <div className="mt-6 text-center">
          <p className="font-medium text-ink">{venueName}</p>
          <p className="mt-1 text-sm text-ink-light">{address}</p>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="mt-3 text-xs tracking-wide text-accent underline underline-offset-4"
          >
            주소 복사
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2">
          <a
            href={kakaoMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-line py-3 text-center text-xs text-ink transition hover:border-accent hover:text-accent"
          >
            카카오맵
          </a>
          <a
            href={naverMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-line py-3 text-center text-xs text-ink transition hover:border-accent hover:text-accent"
          >
            네이버지도
          </a>
          <a
            href={tmapLink}
            className="rounded-lg border border-line py-3 text-center text-xs text-ink transition hover:border-accent hover:text-accent"
          >
            티맵
          </a>
        </div>

        {(parkingInfo || transitInfo || shuttleInfo) && (
          <div className="mt-8 space-y-2 border-t border-line pt-6 text-sm text-ink-light">
            {parkingInfo && <p>🚗 {parkingInfo}</p>}
            {transitInfo && <p>🚇 {transitInfo}</p>}
            {shuttleInfo && <p>🚌 {shuttleInfo}</p>}
          </div>
        )}
      </div>
    </section>
  );
}
