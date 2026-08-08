import Image from "next/image";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import type { Person } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";
import FitOneLine from "@/components/ui/FitOneLine";

// "**텍스트**"를 굵게 렌더링하기 위한 아주 단순한 마크다운 파서
function renderWithBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

interface ProfileCardProps {
  person: Person;
  label: "신랑" | "신부";
}

function ProfileCard({ person, label }: ProfileCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-accent-soft">
        {person.photoPublicId ? (
          <Image
            src={getCloudinaryUrl(person.photoPublicId, {
              width: 480,
              height: 600,
              crop: "fill",
            })}
            alt={`${person.name} 사진`}
            fill
            sizes="(max-width: 640px) 45vw, 220px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-4xl text-accent">
            {person.name.charAt(0)}
          </div>
        )}
      </div>

      <p className="mt-5 flex items-center justify-center gap-2">
        <span className="text-xs font-medium text-accent">{label}</span>
        <span className="font-serif text-xl text-ink">{person.name}</span>
      </p>

      {(person.mbti || person.hobby || person.specialty) && (
        <div className="mt-3 space-y-0.5 text-xs text-ink-light">
          {person.mbti && <p>{person.mbti}</p>}
          {person.hobby && <p>취미: {person.hobby}</p>}
          {person.specialty && <p>특기: {person.specialty}</p>}
        </div>
      )}

      {person.icon && <p className="mt-3 text-lg">{person.icon}</p>}

      {person.introLines && person.introLines.length > 0 && (
        <div className="mt-3 space-y-1 text-xs leading-relaxed text-ink-light">
          {person.introLines.map((line, i) => (
            <FitOneLine key={i}>{renderWithBold(line)}</FitOneLine>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GroomBride() {
  const { contacts } = invitationConfig;

  const groom = contacts.groomSide.find((p) => p.relation === "신랑");
  const bride = contacts.brideSide.find((p) => p.relation === "신부");

  if (!groom || !bride) return null;

  return (
    <section className="bg-paper px-6 py-12 sm:px-10">
      <Reveal className="mx-auto max-w-md">
        <p className="text-center text-xs tracking-[0.35em] text-accent">
          GROOM &amp; BRIDE
        </p>
        <h2 className="mt-4 text-center font-serif text-2xl text-ink">
          신랑 · 신부 소개
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <ProfileCard person={groom} label="신랑" />
          <ProfileCard person={bride} label="신부" />
        </div>
      </Reveal>
    </section>
  );
}
