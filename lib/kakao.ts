// 카카오맵 JS SDK를 페이지당 한 번만 동적으로 로드하기 위한 헬퍼.
// autoload=false로 받아서 스크립트 로드 완료 후 kakao.maps.load()로
// 실제 지도 모듈 초기화를 명시적으로 트리거한다.

declare global {
  interface Window {
    kakao: any;
  }
}

let kakaoScriptPromise: Promise<void> | null = null;

export function loadKakaoMapsScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.kakao?.maps) {
    return Promise.resolve();
  }

  if (kakaoScriptPromise) {
    return kakaoScriptPromise;
  }

  kakaoScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const appKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => resolve());
    };
    script.onerror = () => {
      kakaoScriptPromise = null;
      reject(new Error("카카오맵 SDK 로드에 실패했습니다."));
    };
    document.head.appendChild(script);
  });

  return kakaoScriptPromise;
}
