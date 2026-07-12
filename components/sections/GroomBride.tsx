import Image from "next/image";
import { invitationConfig } from "@/config/invitation.config";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import type { Person } from "@/lib/types";

interface ProfileCardProps {
  person: Person;
  familyOrder: string; // 예: "황용각 · 한미자의 장남"
}

function ProfileCard({ person, familyOrder }: ProfileCardProps) {
  const initial = person.name.charAt(0);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full bg-accent-soft sm:h-28 sm:w-28">
        {person.photoPublicId ? (
          <Image
            src={getCloudinaryUrl(person.photoPublicId, {
              width: 240,
              height: 240,
              crop: "fill",
            })}
            alt={`${person.name} 프로필 사진`}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-serif text-3xl text-accent">
            {initial}
          </div>
        )}
      </div>

      <p className="mt-4 text-xs tracking-widest text-accent">
        {person.relation.toUpperCase() === "신랑" ? "GROOM" : "BRIDE"}
      </p>
      <h3 className="mt-1 font-serif text-xl text-ink">{person.name}</h3>
      <p className="mt-2 text-xs leading-relaxed text-ink-light">
        {familyOrder}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={`tel:${person.phone}`}
          aria-label={`${person.name}에게 전화`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-light transition hover:border-accent hover:text-accent"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5.5C3 4.67 3.67 4 4.5 4H8l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3.5c0 .83-.67 1.5-1.5 1.5C9.4 20 3 13.6 3 5.5Z"
            />
          </svg>
        </a>
        <a
          href={`sms:${person.phone}`}
          aria-label={`${person.name}에게 문자`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-light transition hover:border-accent hover:text-accent"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 5h16v10H8l-4 4V5Z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function GroomBride() {
  const { groomFamily, brideFamily } = invitationConfig.invitationMessage;
  const { contacts } = invitationConfig;

  const groom = contacts.groomSide.find((p) => p.relation === "신랑");
  const bride = contacts.brideSide.find((p) => p.relation === "신부");

  if (!groom || !bride) return null;

  const groomFamilyOrder = `${groomFamily.father} · ${groomFamily.mother}의 ${groomFamily.order}`;
  const brideFamilyOrder = `${brideFamily.father} · ${brideFamily.mother}의 ${brideFamily.order}`;

  return (
    <section className="bg-paper px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-md">
        <p className="text-center text-xs tracking-[0.35em] text-accent">
          GROOM &amp; BRIDE
        </p>
        <h2 className="mt-4 text-center font-serif text-2xl text-ink">
          신랑 · 신부 소개
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <ProfileCard person={groom} familyOrder={groomFamilyOrder} />
          <ProfileCard person={bride} familyOrder={brideFamilyOrder} />
        </div>
      </div>
    </section>
  );
}
