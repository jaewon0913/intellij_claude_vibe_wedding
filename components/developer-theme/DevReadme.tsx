import { invitationConfig } from "@/config/invitation.config";
import Reveal from "@/components/ui/Reveal";

// 우리 초대 문구 안에서 강조하고 싶은 개발 용어에만 색을 입힌다.
const HIGHLIGHTS: Record<string, string> = {
  브랜치: "var(--dev-accent-green)",
  프로젝트: "var(--dev-accent-blue)",
  리뷰: "var(--dev-accent-yellow)",
  커밋: "var(--dev-accent-pink)",
  배포: "var(--dev-accent-orange)",
};

const HIGHLIGHT_PATTERN = new RegExp(`(${Object.keys(HIGHLIGHTS).join("|")})`);

function renderHighlighted(line: string) {
  return line
    .split(HIGHLIGHT_PATTERN)
    .filter((part) => part.length > 0)
    .map((part, i) =>
      HIGHLIGHTS[part] ? (
        <span key={i} style={{ color: HIGHLIGHTS[part] }}>
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
}

export default function DevReadme() {
  const { readmes } = invitationConfig.invitationMessage;

  return (
    <section className="px-4 py-6 sm:px-6">
      <Reveal>
        <p className="text-xs" style={{ color: "var(--dev-text-dim)" }}>
          {"// section: invitation — README.md"}
        </p>

        <div className="mt-6 space-y-5 text-center">
          {readmes.map((readme, i) => (
            <p
              key={i}
              className="text-[13px] leading-loose sm:text-sm"
              style={{ color: "var(--dev-text)" }}
            >
              {readme.split("\n").map((line, j, arr) => (
                <span key={j}>
                  {renderHighlighted(line)}
                  {j < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
