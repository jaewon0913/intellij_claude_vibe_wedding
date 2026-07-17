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
      "서로를 마주 보던 두 사람이,",
      "이제 같은 곳을 바라보며 걸어가려 합니다.",
      "저희 두 사람의 새로운 시작을 축복해 주시면 감사하겠습니다.",
    ],
    groomFamily: { father: "황용각", mother: "한미자", order: "아들", motherDeceased: true },
    brideFamily: { father: "주낙영", mother: "박귀건", order: "딸", motherDeceased: false },
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
    parkingInfo: "건물 주차타워 주차장 이용 (2시간 무료)",
    transitInfo: "1호선 소사역 1번 출구 도보 5분",
    shuttleInfo: undefined,
  },
  accounts: {
    groomSide: [
      { bank: "국민은행", accountNumber: "123456-78-901234", holder: "황재원" },
      { bank: "하나은행", accountNumber: "123456-78-901234", holder: "황용각" },
    ],
    brideSide: [
      { bank: "신한은행", accountNumber: "110-123-456789", holder: "주선영" },
      { bank: "하나은행", accountNumber: "110-123-456789", holder: "주선영" },
      { bank: "우리은행", accountNumber: "110-123-456789", holder: "주선영" },
    ],
  },
  contacts: {
    groomSide: [
      {
        name: "황재원",
        phone: "010-9937-5580",
        relation: "신랑",
        mbti: "INFJ",
        hobby: "신부 생각하기",
        specialty: "신부 웃게 하기",
        icon: "🌳",
        introLines: [
          "항상 든든하고 다정한",
          "**나무 같은 남편**이 되겠습니다.",
          "신부 웃음 지킴이는 제가 평생 맡겠습니다.",
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
        hobby: "신랑 놀리기",
        specialty: "신랑이랑 놀기",
        icon: "☀️",
        introLines: [
          "곁을 밝히는 따뜻한",
          "**햇살 같은 아내**가 되겠습니다.",
          "신랑 하루의 비타민 역할, 평생 책임질게요.",
        ],
        photoPublicId: "선영_어린시절_hkkqab",
      },
      { name: "주낙영", phone: "010-5555-6666", relation: "신부 아버지" },
      { name: "박귀건", phone: "010-7777-8888", relation: "신부 어머니" },
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
};
