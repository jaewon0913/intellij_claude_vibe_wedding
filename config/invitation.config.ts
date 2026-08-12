import type { InvitationConfig } from "@/lib/types";

// 샘플 데이터 (신랑 '재원', 신부 '선영')
// 실제 결혼식 정보가 확정되면 이 파일의 값만 교체하면 전체 청첩장이 업데이트됩니다.
export const invitationConfig: InvitationConfig = {
  meta: {
    siteTitle: "재원🧡선영 결혼합니다",
    siteDescription: "2026년 11월 15일 일요일 오전 10시30분, MJ컨벤션",
    ogImageUrl: "https://res.cloudinary.com/your-cloud/image/upload/wedding/og-image.jpg",
    siteUrl: "https://intellij-claude-vibe-wedding.vercel.app",
  },
  hero: {
    groomName: "재원",
    brideName: "선영",
    eventDateText: "2026. 11. 15 SUN  10:30 AM",
    backgroundImagePublicId: "KakaoTalk_20260714_220643063_b9od1j",
    backgroundVideoPublicId: "video_lbovw1",
  },
  invitationMessage: {
    title: "저희 결혼합니다",
    paragraphs: [
      "손을 잡고, 발을 맞춰",
        "마주 보며 키워온 사랑을 바탕으로\n이제는 나란히 서서 같은 내일을 향해 걸어갑니다.",
      "마주 잡은 손을 놓지 않고 예쁘게 살겠습니다.\n저희의 시작을 함께 축하해 주세요.",
    ],
    groomFamily: { father: "황용각", mother: "한미자", order: "아들", motherDeceased: true },
    brideFamily: { father: "주낙영", mother: "박귀연", order: "딸", motherDeceased: false },
  },
  eventInfo: {
    date: "2026-11-15",
    time: "10:30",
    venueName: "MJ컨벤션",
    hallName: "파티오볼룸 5층",
  },
  gallery: {
    folder: "vibe_wedding/gallery",
  },
  location: {
    address: "경기 부천시 소사구 경인로 386 1층",
    venueName: "MJ컨벤션",
    lat: 37.4817956,
    lng: 126.7985091,
    parkingInfo: [
      "네비게이션 입력: 부천시 소사구 소사본동 65-7번지",
      "서울외곽순환도로(시흥IC) - 소사본3동 - 소사구청 옆",
      "건물 주차타워 주차장 이용 (2시간 무료)",
    ],
    transitInfo: [
        "1호선/서해선 소사역 1번 출구 도보 5분",
        "※ 1호선은 급행 미정차 구간입니다."
    ],
    shuttleInfo: [
        "소사구청 삼거리 · MJ컨벤션 : 19, 83, 88",
        "소사구청 삼거리 : 73, 60-1, 99",
        "소사구청 삼거리 : 53",
        "소사역 · 소사지구대 : 19, 53, 83, 88",
        "소사푸르지오 : 20, 56, 56-1, 60, 60-1"
    ],
  },
  accounts: {
    groomSide: [
      { bank: "국민은행", accountNumber: "656502-01-389297", holder: "황재원" },
      { bank: "국민은행", accountNumber: "659425-01-052627", holder: "황용각" },
    ],
    brideSide: [
      { bank: "하나은행", accountNumber: "748-911084-19807", holder: "주선영" },
      { bank: "하나은행", accountNumber: "243-910062-32507", holder: "주낙영" },
      { bank: "하나은행", accountNumber: "311-890055-83007", holder: "박귀연" },
    ],
  },
  contacts: {
    groomSide: [
      {
        name: "황재원",
        phone: "010-9937-5580",
        relation: "신랑",
        mbti: "INFJ",
        hobby: "선영이 사진 예쁘게 찍어주기",
        specialty: "선영이 좋아하는 맛집 찾기",
        icon: "🌳",
        introLines: [
          "언제나 선영이의",
          "**가장 든든한 남편**이 되겠습니다.",
          "소중한 순간들을 함께 담아내며",
          "늘 달콤한 행복을 선물할게요.",
        ],
        photoPublicId: "재원_어린시절_vjojq2",
      },
      { name: "황용각", phone: "010-1111-2222", relation: "신랑 아버지" },
      //{ name: "한미자", phone: "010-3333-4444", relation: "신랑 어머니" },
    ],
    brideSide: [
      {
        name: "주선영",
        phone: "010-9855-7030",
        relation: "신부",
        mbti: "ENFP",
        hobby: "재원이만의 연예인 되기",
        specialty: "재원이 행복하게 웃게 하기",
        icon: "☀️",
        introLines: [
          "언제나 재원이의",
          "**가장 따뜻한 아내**가 되겠습니다.",
          "마주 보는 얼굴에 웃음만 가득하도록",
          "늘 다정하게 곁을 지킬게요.",
        ],
        photoPublicId: "선영_어린시절_hkkqab",
      },
      { name: "주낙영", phone: "010-2448-3592", relation: "신부 아버지" },
      { name: "박귀연", phone: "010-3359-5492", relation: "신부 어머니" },
    ],
  },
  share: {
    kakaoTitle: "재원🧡선영 결혼합니다",
    kakaoDescription: "2026년 11월 15일 일요일 오전 10시30분, MJ컨벤션",
    kakaoImageUrl: "https://res.cloudinary.com/your-cloud/image/upload/wedding/og-image.jpg",
    kakaoAppKey: "", // process.env.NEXT_PUBLIC_KAKAO_JS_KEY 사용 예정 (lib/kakao.ts에서 처리)
    kakaoTemplateId: 135431,
  },
  closing: {
    message: "저희의 시작을 함께해주셔서 감사합니다",
  },
  bgm: {
    // Cloudinary에 음원(mp3) 업로드 후 public_id만 넣으면 자동으로 재생됩니다.
    publicId: "mixkit-wedding-harp-672_mh7itx",
  },
};
