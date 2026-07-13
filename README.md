# 모바일 청첩장 (재원 ❤ 선영)

Next.js(App Router) + TypeScript + Tailwind CSS로 만든 모바일 청첩장입니다.

## 로컬 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속.

프로덕션 빌드 확인:

```bash
npm run build
```

## 환경변수

`.env.local.example`을 복사해서 `.env.local`을 만들고 아래 값을 채워주세요. (`.env.local`은 git에 올라가지 않습니다.)

| 변수명 | 설명 | 발급 링크 |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | supabase.com -> 프로젝트 생성 -> Project Settings -> API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon(public) 키 | 위와 동일 화면 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role 키 (서버 전용, 절대 클라이언트에 노출 금지) | 위와 동일 화면 |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud name | cloudinary.com -> Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | 위와 동일 화면 |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | 위와 동일 화면 |
| `NEXT_PUBLIC_KAKAO_JS_KEY` | 카카오 디벨로퍼스 JavaScript 키 | developers.kakao.com -> 내 애플리케이션 -> 앱 설정 -> 앱 키 |

### 카카오 디벨로퍼스 도메인 등록 (필수)

카카오맵/카카오톡 공유가 동작하려면 내 애플리케이션 -> 앱 설정 -> 플랫폼 -> Web 플랫폼에 아래 도메인을 등록해야 합니다.

- 로컬 개발: `http://localhost:3000`
- 배포 후: 실제 배포 도메인 (예: `https://your-wedding.vercel.app`)

등록하지 않으면 지도/공유 기능이 콘솔 에러와 함께 동작하지 않습니다.

### Supabase 테이블

`supabase/migrations/0001_create_gallery_images.sql` 내용을 Supabase 대시보드의 SQL Editor에 그대로 붙여넣어 실행하면 `gallery_images` 테이블과 RLS 정책이 생성됩니다.

## 데이터 수정

실제 결혼식 정보(이름, 날짜, 장소, 계좌, 연락처 등)는 `config/invitation.config.ts` 한 파일만 수정하면 전체 페이지에 반영됩니다.

## Vercel 배포 방법

1. 이 GitHub 저장소를 vercel.com에 New Project로 Import
2. 위 환경변수 7개를 Vercel 프로젝트의 Settings -> Environment Variables에 동일하게 등록
3. Deploy 클릭 -> 배포 완료 후 발급된 도메인(예: `https://xxx.vercel.app`) 확인
4. `config/invitation.config.ts`의 `meta.siteUrl`을 실제 배포 도메인으로 수정 후 다시 push (OG 메타태그/카카오 공유 링크에 사용됨)
5. 카카오 디벨로퍼스 Web 플랫폼에 배포 도메인 추가 등록
6. 이후 `main` 브랜치에 push할 때마다 Vercel이 자동으로 재배포합니다

## 배포 전 최종 체크리스트

| 항목 | 확인 |
|---|---|
| `npm run build` 로컬에서 에러 없이 통과 | [ ] |
| `.env.local`의 모든 값이 Vercel 환경변수에도 동일하게 등록됨 | [ ] |
| 카카오 디벨로퍼스 Web 플랫폼에 배포 도메인 등록 완료 | [ ] |
| `config/invitation.config.ts`의 `meta.siteUrl`을 실제 배포 도메인으로 수정 | [ ] |
| Supabase `gallery_images` 마이그레이션 실행 완료 | [ ] |
| Cloudinary에 실제 사진 업로드 및 `public_id` 반영 완료 | [ ] |
| 실제 기기(모바일)에서 카카오톡 공유 테스트 | [ ] |
| 실제 기기에서 지도/전화/문자 버튼 동작 확인 | [ ] |
| 계좌번호/연락처 정보가 실제 값으로 맞게 채워짐 | [ ] |
