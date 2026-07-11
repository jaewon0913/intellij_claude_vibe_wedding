// 기획서 8장 "설정 파일(Config) 스키마" 기준 타입 정의

export interface Person {
  name: string;
  nameEn?: string;
  phone: string; // "010-1234-5678" 형태 (tel: 링크 생성 시 자동 변환)
  relation: string; // "신랑", "신부", "신랑 아버지" 등
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  holder: string;
  kakaopayLink?: string; // 선택
}

export interface InvitationConfig {
  meta: {
    siteTitle: string; // OG title
    siteDescription: string; // OG description
    ogImageUrl: string; // OG image (Cloudinary URL)
    siteUrl: string; // 배포 도메인
  };
  hero: {
    groomName: string;
    brideName: string;
    eventDateText: string; // "2026.10.17 SAT 1:00 PM"
    backgroundImagePublicId: string; // Cloudinary public_id
  };
  invitationMessage: {
    title: string;
    paragraphs: string[]; // 문단 단위 배열
    groomFamily: {
      father: string;
      mother: string;
      order: string; // order: "장남" 등
      fatherDeceased?: boolean; // true면 이름 앞에 "故" 표기 + 국화 아이콘 노출
      motherDeceased?: boolean;
    };
    brideFamily: {
      father: string;
      mother: string;
      order: string;
      fatherDeceased?: boolean;
      motherDeceased?: boolean;
    };
  };
  eventInfo: {
    date: string; // ISO date "2026-10-17"
    time: string; // "13:00"
    venueName: string;
    hallName: string;
  };
  gallery: {
    // Supabase에서 가져오는 게 기본이지만, 폴백/초기 데이터용으로 일부 명시 가능
    folder: string; // Cloudinary 폴더명
  };
  location: {
    address: string;
    venueName: string;
    lat: number;
    lng: number;
    parkingInfo?: string;
    transitInfo?: string;
    shuttleInfo?: string;
  };
  accounts: {
    groomSide: BankAccount[];
    brideSide: BankAccount[];
  };
  contacts: {
    groomSide: Person[];
    brideSide: Person[];
  };
  share: {
    kakaoTitle: string;
    kakaoDescription: string;
    kakaoImageUrl: string;
    kakaoAppKey: string; // 실제로는 .env에서 가져오되 구조상 위치 표시
  };
}
