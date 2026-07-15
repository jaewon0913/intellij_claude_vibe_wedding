// 로그인 성공 시 발급되는 세션 쿠키 이름.
// 값 자체는 ADMIN_SESSION_SECRET(긴 무작위 문자열)이 그대로 들어가며,
// httpOnly라 클라이언트 JS에서는 읽을 수 없다.
export const ADMIN_SESSION_COOKIE = "admin_session";
