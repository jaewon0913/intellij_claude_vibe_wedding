import { invitationConfig } from "@/config/invitation.config";
import Reveal from "@/components/ui/Reveal";

export default function DevReadme() {
  const { paragraphs } = invitationConfig.invitationMessage;

  return (
    <section className="px-4 py-6 sm:px-6">
      <Reveal>
        <p className="text-xs" style={{ color: "var(--dev-text-dim)" }}>
          {"// section: invitation — README.md"}
        </p>

        <div className="mt-6 space-y-5 text-center">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-[13px] leading-loose sm:text-sm"
              style={{ color: "var(--dev-text)" }}
            >
              {paragraph.split("\n").map((line, j, arr) => (
                <span key={j}>
                  {line}
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
