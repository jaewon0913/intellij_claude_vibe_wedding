// 카카오맵 JS SDK를 페이지당 한 번만 동적으로 로드하기 위한 헬퍼.
// autoload=false로 받아서 스크립트 로드 완료 후 kakao.maps.load()로
// 실제 지도 모듈 초기화를 명시적으로 트리거한다.

declare global {
  interface Window {
    kakao: any;
    Kakao: any;
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

// ---------------------------------------------------------------------------
// 카카오톡 공유(Kakao.Share) SDK
// 지도 SDK(dapi.kakao.com)와는 별개의 SDK(t1.kakaocdn.net)이며,
// 같은 JavaScript 키(NEXT_PUBLIC_KAKAO_JS_KEY)를 사용한다.
// ---------------------------------------------------------------------------

const KAKAO_SHARE_SDK_VERSION = "2.7.5";

let kakaoShareSdkPromise: Promise<void> | null = null;

function loadKakaoShareSdk(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.Kakao?.isInitialized?.()) {
    return Promise.resolve();
  }

  if (kakaoShareSdkPromise) {
    return kakaoShareSdkPromise;
  }

  kakaoShareSdkPromise = new Promise((resolve, reject) => {
    const initialize = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
      resolve();
    };

    if (window.Kakao) {
      initialize();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://t1.kakaocdn.net/kakao_js_sdk/${KAKAO_SHARE_SDK_VERSION}/kakao.min.js`;
    script.async = true;
    script.onload = initialize;
    script.onerror = () => {
      kakaoShareSdkPromise = null;
      reject(new Error("카카오 공유 SDK 로드에 실패했습니다."));
    };
    document.head.appendChild(script);
  });

  return kakaoShareSdkPromise;
}

export interface KakaoShareConfig {
  title: string;
  description: string;
  imageUrl: string;
  imageWidth?: number;
  imageHeight?: number;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}

/**
 * 버튼 클릭 시점에 최초로 SDK를 불러와 초기화한 뒤 공유 시트를 연다.
 * (페이지 로드 시 바로 SDK를 받지 않는 지연 로딩 방식)
 *
 * imageWidth/imageHeight를 넘겨주지 않으면 카카오톡이 자체 템플릿 박스(정사각형에 가까움)에
 * 맞춰 이미지를 강제로 크롭해버리므로, 실제 이미지 비율을 반드시 함께 전달한다.
 */
export async function shareKakao(config: KakaoShareConfig): Promise<void> {
  await loadKakaoShareSdk();

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: config.title,
      description: config.description,
      imageUrl: config.imageUrl,
      imageWidth: config.imageWidth,
      imageHeight: config.imageHeight,
      link: config.link,
    },
  });
}

/**
 * 카카오 디벨로퍼스 "메시지 템플릿 빌더"로 만든 커스텀 템플릿을 사용해 공유한다.
 * 템플릿 안에서 %{변수명}으로 지정해둔 부분만 templateArgs로 실행 시점에 채울 수 있고,
 * 나머지(고정 텍스트/링크 등)는 템플릿에 저장된 값 그대로 나간다.
 *
 * 예: templateArgs = { imageUrl: "https://res.cloudinary.com/..." }
 */
export async function shareKakaoCustom(
  templateId: number,
  templateArgs: Record<string, string>
): Promise<void> {
  await loadKakaoShareSdk();

  window.Kakao.Share.sendCustom({
    templateId,
    templateArgs,
  });
}
