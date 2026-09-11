import { invitationConfig } from "@/config/invitation.config";
import type { Person } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

function CoupleCard({
  label,
  color,
  person,
}: {
  label: "GROOM" | "BRIDE";
  color: string;
  person: Person;
}) {
  return (
    <div
      className="rounded-lg border-l-4 p-4"
      style={{
        backgroundColor: "var(--dev-bg-panel)",
        border: "1px solid var(--dev-border)",
        borderLeftWidth: 4,
        borderLeftColor: color,
      }}
    >
      <div className="flex items-center justify-between">
        <span style={{ color }}>{label.toLowerCase()}:</span>
        <span
          className="rounded-full border px-2 py-0.5 text-[10px]"
          style={{ borderColor: color, color }}
        >
          {label}
        </span>
      </div>

      <div
        className="mt-2 space-y-1 pl-3 text-[13px] leading-relaxed sm:text-sm"
        style={{ color: "var(--dev-text)" }}
      >
        <p>
          <span style={{ color: "var(--dev-accent-blue)" }}>name</span>:{" "}
          <span style={{ color: "var(--dev-accent-orange)" }}>{person.name}</span>
        </p>
        {person.nameEn && (
          <p>
            <span style={{ color: "var(--dev-accent-blue)" }}>name_en</span>
            :{" "}
            <span style={{ color: "var(--dev-accent-orange)" }}>
              &quot;{person.nameEn}&quot;
            </span>
          </p>
        )}
        {person.mbti && (
          <p>
            <span style={{ color: "var(--dev-accent-blue)" }}>mbti</span>:{" "}
            <span style={{ color: "var(--dev-accent-orange)" }}>{person.mbti}</span>
          </p>
        )}
        {person.hobby && (
          <p>
            <span style={{ color: "var(--dev-accent-blue)" }}>hobby</span>:{" "}
            <span style={{ color: "var(--dev-accent-orange)" }}>
              &quot;{person.hobby}&quot;
            </span>
          </p>
        )}
        {person.specialty && (
          <p>
            <span style={{ color: "var(--dev-accent-blue)" }}>specialty</span>
            :{" "}
            <span style={{ color: "var(--dev-accent-orange)" }}>
              &quot;{person.specialty}&quot;
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default function DevCoupleYaml() {
  const groom = invitationConfig.contacts.groomSide.find(
    (p) => p.relation === "신랑"
  );
  const bride = invitationConfig.contacts.brideSide.find(
    (p) => p.relation === "신부"
  );

  if (!groom || !bride) return null;

  return (
    <section className="px-4 py-6 sm:px-6">
      <Reveal>
        <p
          className="mb-3 text-xs"
          style={{ color: "var(--dev-text-dim)" }}
        >
          {"// "}couple.yaml
        </p>
        <div className="space-y-3">
          <CoupleCard label="GROOM" color="var(--dev-accent-green)" person={groom} />
          <CoupleCard label="BRIDE" color="var(--dev-accent-pink)" person={bride} />
        </div>
      </Reveal>
    </section>
  );
}
