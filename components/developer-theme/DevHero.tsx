import { invitationConfig } from "@/config/invitation.config";
import TerminalWindow from "./TerminalWindow";

export default function DevHero() {
  const { groomName, brideName } = invitationConfig.hero;
  const { date, time, venueName } = invitationConfig.eventInfo;

  return (
    <section className="px-4 pb-6 pt-8 sm:px-6">
      <TerminalWindow title="wedding.config.ts">
        <pre
          className="overflow-x-auto text-[13px] leading-relaxed sm:text-sm"
          style={{ color: "var(--dev-text)" }}
        >
          <span style={{ color: "var(--dev-accent-blue)" }}>const</span>{" "}
          <span style={{ color: "var(--dev-accent-green)" }}>wedding</span>{" "}
          = {"{"}
          {"\n"}
          {"  "}groom: <span style={{ color: "var(--dev-accent-orange)" }}>&quot;{groomName}&quot;</span>,
          {"\n"}
          {"  "}bride: <span style={{ color: "var(--dev-accent-orange)" }}>&quot;{brideName}&quot;</span>,
          {"\n"}
          {"  "}date: <span style={{ color: "var(--dev-accent-orange)" }}>&quot;{date} {time}&quot;</span>,
          {"\n"}
          {"  "}venue: <span style={{ color: "var(--dev-accent-orange)" }}>&quot;{venueName}&quot;</span>,
          {"\n"}
          {"  "}status:{" "}
          <span style={{ color: "var(--dev-accent-yellow)" }}>&quot;married&quot;</span>
          {"\n"}
          {"}"}
          <span className="dev-cursor-blink">▌</span>
        </pre>
      </TerminalWindow>

      <p
        className="mt-4 text-center text-xs"
        style={{ color: "var(--dev-text-dim)" }}
      >
        # {groomName} &amp; {brideName} — wedding invitation, developer edition
      </p>
    </section>
  );
}
