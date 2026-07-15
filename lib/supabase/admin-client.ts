import { createClient } from "@supabase/supabase-js";

// service_role 키는 RLS를 완전히 무시하므로 절대 클라이언트 번들에 포함되면 안 된다.
// 이 파일은 Route Handler 등 서버 전용 코드에서만 import할 것.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey)
    : null;
