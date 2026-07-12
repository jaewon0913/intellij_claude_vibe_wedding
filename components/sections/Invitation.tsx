import { invitationConfig } from "@/config/invitation.config";
import ChrysanthemumIcon from "@/components/ui/ChrysanthemumIcon";

function ParentName({
  name,
  deceased,
}: {
  name: string;
  deceased?: boolean;
}) {
  if (!deceased) return <>{name}</>;
  return (
    <span className="inline-flex items-center gap-1">
      <ChrysanthemumIcon />
      <span>{name}</span>
    </span>
  );
}

export default function Invitation() {
  const { title, paragraphs, groomFamily, brideFamily } =
    invitationConfig.invitationMessage;
  const { groomName, brideName } = invitationConfig.hero;

  return (
    <section className="bg-paper px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-md">
        <p className="text-xs tracking-[0.35em] text-accent">💍 WEDDING INVITATION</p>
        <h2 className="mt-4 font-serif text-2xl leading-snug text-ink sm:text-3xl">
          {title}
        </h2>

        <div className="mt-10 space-y-6">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="font-serif text-[15px] leading-loose tracking-wide text-ink/90"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <div className="space-y-2 text-sm leading-relaxed text-ink-light">
            <p>
              <ParentName
                name={groomFamily.father}
                deceased={groomFamily.fatherDeceased}
              />{" "}
              ·{" "}
              <ParentName
                name={groomFamily.mother}
                deceased={groomFamily.motherDeceased}
              />
              의 {groomFamily.order}{" "}
              <span className="font-medium text-ink">{groomName}</span>
            </p>
            <p>
              <ParentName
                name={brideFamily.father}
                deceased={brideFamily.fatherDeceased}
              />{" "}
              ·{" "}
              <ParentName
                name={brideFamily.mother}
                deceased={brideFamily.motherDeceased}
              />
              의 {brideFamily.order}{" "}
              <span className="font-medium text-ink">{brideName}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
