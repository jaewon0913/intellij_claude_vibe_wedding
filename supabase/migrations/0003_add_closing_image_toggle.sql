-- ShareFooter의 클로징 이미지 노출 여부를 재배포 없이 관리자에서 토글하기 위한 컬럼
alter table public.site_settings
  add column if not exists closing_image_enabled boolean not null default true;

comment on column public.site_settings.closing_image_enabled is 'ShareFooter의 클로징 이미지 노출 여부';
