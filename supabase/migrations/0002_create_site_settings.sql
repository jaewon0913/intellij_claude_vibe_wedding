-- =========================================================
-- site_settings
-- 재배포 없이 즉시 반영하고 싶은 사이트 전역 설정값 저장용 (예: 꽃잎 효과 on/off).
-- 항상 id=1인 단일 행만 사용한다.
-- =========================================================

create table if not exists public.site_settings (
  id              smallint primary key default 1,
  petals_enabled  boolean not null default true,
  updated_at      timestamptz not null default now(),

  constraint site_settings_singleton check (id = 1)
);

comment on table public.site_settings is '재배포 없이 토글하고 싶은 사이트 전역 설정 (항상 id=1 단일 행)';
comment on column public.site_settings.petals_enabled is '흩날리는 꽃잎 효과 노출 여부';

insert into public.site_settings (id, petals_enabled)
values (1, true)
on conflict (id) do nothing;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
  before update on public.site_settings
  for each row
  execute function public.set_updated_at();

-- anon 키는 읽기만 가능. 쓰기는 정책을 안 만들어서 service_role로만 가능하게 막음.
alter table public.site_settings enable row level security;

drop policy if exists "public can read site settings" on public.site_settings;
create policy "public can read site settings"
  on public.site_settings
  for select
  to anon, authenticated
  using (true);
