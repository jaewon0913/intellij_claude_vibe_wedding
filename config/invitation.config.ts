import type { InvitationConfig } from "@/lib/types";

// 샘플 데이터 (신랑 '재원', 신부 '선영')
// 실제 결혼식 정보가 확정되면 이 파일의 값만 교체하면 전체 청첩장이 업데이트됩니다.
export const invitationConfig: InvitationConfig = {
  meta: {
    siteTitle: "재원 ❤ 선영 결혼합니다",
    siteDescription: "2026년 11월 15일 일요일 오전 10시30분, MJ컨벤션",
    ogImageUrl: "https://res.cloudinary.com/your-cloud/image/upload/wedding/og-image.jpg",
    siteUrl: "https://your-wedding.vercel.app",
  },
  hero: {
    groomName: "재원",
    brideName: "선영",
    eventDateText: "2026. 11. 15 SUN  10:30 AM",
    backgroundImagePublicId: "default_main_dmgt4l",
  },
  invitationMessage: {
    title: "저희 결혼합니다",
    paragraphs: [
      "서로가 마주 보던 두 사람이,",
      "이제 같은 곳을 바라보며 걸어가려 합니다.",
      "저희 두 사람의 새로운 시작을 축복해 주시면 감사하겠습니다.",
    ],
    groomFamily: { father: "황용각", mother: "한미자", order: "장남", motherDeceased: true },
    brideFamily: { father: "주낙영", mother: "박귀건", order: "장녀" },
  },
  eventInfo: {
    date: "2026-11-15",
    time: "10:30",
    venueName: "MJ컨벤션",
    hallName: "그랜드홀 3층",
  },
  gallery: {
    folder: "vibe_wedding/gallery",
  },
  location: {
    address: "서울특별시 강남구 테헤란로 000",
    venueName: "MJ컨벤션",
    lat: 37.5012743,
    lng: 127.039585,
    parkingInfo: "건물 지하 1~3층 주차장 이용 (2시간 무료)",
    transitInfo: "2호선 강남역 3번 출구 도보 5분",
    shuttleInfo: undefined,
  },
  accounts: {
    groomSide: [
      { bank: "국민은행", accountNumber: "123456-78-901234", holder: "황재원" },
    ],
    brideSide: [
      { bank: "신한은행", accountNumber: "110-123-456789", holder: "주선영" },
    ],
  },
  contacts: {
    groomSide: [
      { name: "황재원", phone: "010-1234-5678", relation: "신랑" },
      { name: "황OO", phone: "010-1111-2222", relation: "신랑 아버지" },
      { name: "김OO", phone: "010-3333-4444", relation: "신랑 어머니" },
    ],
    brideSide: [
      { name: "주선영", phone: "010-5678-1234", relation: "신부" },
      { name: "주낙영", phone: "010-5555-6666", relation: "신부 아버지" },
      { name: "박귀건", phone: "010-7777-8888", relation: "신부 어머니" },
    ],
  },
  share: {
    kakaoTitle: "재원 ❤ 선영 결혼합니다",
    kakaoDescription: "2026년 11월 15일 일요일 오전 10시30분, MJ컨벤션",
    kakaoImageUrl: "https://res.cloudinary.com/your-cloud/image/upload/wedding/og-image.jpg",
    kakaoAppKey: "", // process.env.NEXT_PUBLIC_KAKAO_JS_KEY 사용 예정 (lib/kakao.ts에서 처리)
  },
};
