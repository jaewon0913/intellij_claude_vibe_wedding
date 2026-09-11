import { invitationConfig } from "@/config/invitation.config";
import { getDDayText, formatEventDateTime } from "@/lib/date";
import TerminalWindow from "./TerminalWindow";

export default function DevDeployCard() {
  const { date, time, venueName, hallName } = invitationConfig.eventInfo;
  const dDayText = getDDayText(date);
  const { datePart, timePart } = formatEventDateTime(date, time);

  return (
    <section className="px-4 py-6 sm:px-6">
      <TerminalWindow title="deploy --status">
        <div
          className="text-[13px] leading-relaxed sm:text-sm"
          style={{ color: "var(--dev-text)" }}
        >
          <p>
            <span style={{ color: "var(--dev-accent-green)" }}>✓</span>{" "}
            Deployment scheduled
          </p>
          <p className="mt-2 pl-5">
            environment:{" "}
            <span style={{ color: "var(--dev-accent-blue)" }}>
              production
            </span>
          </p>
          <p className="pl-5">
            target: <span style={{ color: "var(--dev-accent-orange)" }}>
              {venueName} · {hallName}
            </span>
          </p>
          <p className="pl-5">
            scheduled_at:{" "}
            <span style={{ color: "var(--dev-accent-orange)" }}>
              {datePart} {timePart}
            </span>
          </p>
          <p
            className="mt-3 rounded px-3 py-2 text-xs"
            style={{
              backgroundColor: "var(--dev-bg-panel-2)",
              color: "var(--dev-accent-yellow)",
            }}
          >
            {"// "}
            {dDayText}
          </p>
        </div>
      </TerminalWindow>
    </section>
  );
}
