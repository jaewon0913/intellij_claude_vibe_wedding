-- =========================================================
-- gallery_images
-- 청첩장 갤러리 섹션에서 보여줄 사진 메타데이터 테이블
-- 실제 이미지 파일은 Cloudinary에 저장하고, 여기서는 public_id와
-- 노출/정렬/설명 등 "관리용" 메타데이터만 관리한다.
-- =========================================================

create extension if not exists "pgcrypto"; -- gen_random_uuid() 사용을 위함

create table if not exists public.gallery_images (
  id              uuid primary key default gen_random_uuid(),

  -- Cloudinary에 업로드된 이미지의 public_id (예: "wedding/gallery/001")
  public_id       text not null,

  -- 화면에 표시되는 순서 (오름차순). 같은 값이면 created_at 순으로 보조 정렬.
  sort_order      integer not null default 0,

  -- false로 바꾸면 삭제하지 않고도 갤러리에서 즉시 숨길 수 있음
  is_visible      boolean not null default true,

  -- 선택 항목: 사진 아래 짧은 설명(있으면 GalleryModal에서 노출 가능)
  caption         text,

  -- 선택 항목: 원본 이미지 가로/세로 픽셀 크기.
  -- 있으면 프론트에서 aspect-ratio를 미리 계산해 CLS(레이아웃 시프트)를 줄일 수 있음.
  width           integer,
  height          integer,

  -- 선택 항목: 사진 분류 (예: 'couple' | 'family' | 'behind' 등).
  -- 지금 당장 필터 UI는 없지만, 나중에 카테고리별 탭을 추가하고 싶을 때를 대비해 미리 열어둠.
  category        text,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint gallery_images_public_id_unique unique (public_id),
  constraint gallery_images_sort_order_nonnegative check (sort_order >= 0),
  constraint gallery_images_dimensions_positive
    check (
      (width is null or width > 0) and
      (height is null or height > 0)
    )
);

comment on table public.gallery_images is '청첩장 갤러리에 노출되는 사진 메타데이터 (실제 파일은 Cloudinary)';
comment on column public.gallery_images.public_id is 'Cloudinary public_id, 예: wedding/gallery/001';
comment on column public.gallery_images.sort_order is '갤러리 노출 순서 (오름차순)';
comment on column public.gallery_images.is_visible is 'false면 삭제 없이 갤러리에서 숨김 처리';

-- 실제 조회 패턴(is_visible=true 이면서 sort_order로 정렬)에 맞춘 복합 인덱스
create index if not exists idx_gallery_images_visible_sort
  on public.gallery_images (is_visible, sort_order);

-- updated_at 자동 갱신 트리거
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_gallery_images_updated_at on public.gallery_images;
create trigger trg_gallery_images_updated_at
  before update on public.gallery_images
  for each row
  execute function public.set_updated_at();

-- =========================================================
-- Row Level Security
-- anon(NEXT_PUBLIC_SUPABASE_ANON_KEY) 키는 클라이언트에 그대로 노출되므로,
-- "보이는 사진만 읽기 가능"으로 제한하고 쓰기는 전부 막는다.
-- 사진 등록/수정/삭제는 Supabase 대시보드(또는 service_role 키)로만 수행.
-- =========================================================
alter table public.gallery_images enable row level security;

drop policy if exists "public can read visible gallery images" on public.gallery_images;
create policy "public can read visible gallery images"
  on public.gallery_images
  for select
  to anon, authenticated
  using (is_visible = true);

-- insert/update/delete에 대한 정책을 만들지 않음 = anon/authenticated는 쓰기 불가
