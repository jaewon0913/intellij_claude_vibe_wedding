import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { invitationConfig } from "@/config/invitation.config";

// 메인 청첩장 맨 아래에서 developer 테마로 넘어갈 수 있게 안내하는 섹션.
// ShareFooter와는 별개 파일로 관리.
export default function DevThemeLink() {
  const { groomName, brideName } = invitationConfig.hero;

  return (
    <section className="bg-paper px-6 pb-12 pt-2 sm:px-10">
      <Reveal className="mx-auto max-w-md text-center">
        <p className="text-sm leading-relaxed text-ink-light">
          특별한 버전의 청첩장도 함께 준비했어요.
          <br />
          재미 삼아 편하게 구경해 주세요!
        </p>

        <div className="mt-6">
          <Link
            href="/developer"
            className="inline-block rounded-full border border-line px-6 py-2.5 text-sm text-ink transition hover:border-accent hover:text-accent"
          >
            {"</>"} 개발자 버전 보기
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
