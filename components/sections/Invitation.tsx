import { invitationConfig } from "@/config/invitation.config";
import ChrysanthemumIcon from "@/components/ui/ChrysanthemumIcon";

function ParentName({
  name,
  deceased,
}: {
  name: string;
  deceased?: boolean;
}) {
  // 국화 아이콘이 있을 때와 없을 때 텍스트 시작 위치가 어긋나지 않도록,
  // 고인이 아니어도 같은 너비의 자리를 투명하게 확보해둔다.
  return (
    <span className="inline-flex items-center gap-1">
      <ChrysanthemumIcon className={deceased ? "" : "invisible"} />
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
      <div className="mx-auto max-w-md text-center">
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
          <div className="mx-auto inline-grid grid-cols-[auto_auto_auto_auto_auto_auto] items-center justify-center gap-x-1.5 gap-y-3 text-sm text-ink-light">
            <span className="justify-self-end whitespace-nowrap">
              <ParentName
                name={groomFamily.father}
                deceased={groomFamily.fatherDeceased}
              />
            </span>
            <span className="justify-self-center">·</span>
            <span className="justify-self-start whitespace-nowrap">
              <ParentName
                name={groomFamily.mother}
                deceased={groomFamily.motherDeceased}
              />
            </span>
            <span className="justify-self-start">의</span>
            <span className="justify-self-start">{groomFamily.order}</span>
            <span className="justify-self-start font-semibold text-ink">
              {groomName}
            </span>

            <span className="justify-self-end whitespace-nowrap">
              <ParentName
                name={brideFamily.father}
                deceased={brideFamily.fatherDeceased}
              />
            </span>
            <span className="justify-self-center">·</span>
            <span className="justify-self-start whitespace-nowrap">
              <ParentName
                name={brideFamily.mother}
                deceased={brideFamily.motherDeceased}
              />
            </span>
            <span className="justify-self-start">의</span>
            <span className="justify-self-start">{brideFamily.order}</span>
            <span className="justify-self-start font-semibold text-ink">
              {brideName}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
