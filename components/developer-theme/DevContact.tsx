"use client";

import { useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import type { Person } from "@/lib/types";
import TerminalWindow from "./TerminalWindow";

function ContactRow({ person }: { person: Person }) {
  const isPrimary = person.relation === "신랑" || person.relation === "신부";
  return (
    <div className="flex items-center justify-between py-1">
      <span>
        <span style={{ color: "var(--dev-accent-pink)" }}>- name:</span>{" "}
        {person.name}{" "}
        <span style={{ color: "var(--dev-text-dim)" }}>
          # {person.relation}
        </span>
      </span>
      <span className="flex shrink-0 gap-2 pl-2">
        <a
          href={`tel:${person.phone}`}
          className="rounded border px-1.5 py-0.5 text-[10px] transition hover:opacity-80"
          style={{
            borderColor: "var(--dev-border)",
            color: isPrimary ? "var(--dev-accent-green)" : "var(--dev-text-dim)",
          }}
        >
          call
        </a>
        <a
          href={`sms:${person.phone}`}
          className="rounded border px-1.5 py-0.5 text-[10px] transition hover:opacity-80"
          style={{
            borderColor: "var(--dev-border)",
            color: isPrimary ? "var(--dev-accent-green)" : "var(--dev-text-dim)",
          }}
        >
          sms
        </a>
      </span>
    </div>
  );
}

export default function DevContact() {
  const [tab, setTab] = useState<"groom" | "bride">("groom");
  const { groomSide, brideSide } = invitationConfig.contacts;
  const people = tab === "groom" ? groomSide : brideSide;

  return (
    <section className="px-4 py-6 sm:px-6">
      <TerminalWindow title="team.yaml">
        <div className="mb-3 flex gap-2 text-xs">
          <button
            type="button"
            onClick={() => setTab("groom")}
            className="rounded border px-2 py-1 transition"
            style={{
              borderColor: "var(--dev-border)",
              backgroundColor:
                tab === "groom" ? "var(--dev-bg-panel-2)" : "transparent",
              color:
                tab === "groom" ? "var(--dev-accent-green)" : "var(--dev-text-dim)",
            }}
          >
            groom_team
          </button>
          <button
            type="button"
            onClick={() => setTab("bride")}
            className="rounded border px-2 py-1 transition"
            style={{
              borderColor: "var(--dev-border)",
              backgroundColor:
                tab === "bride" ? "var(--dev-bg-panel-2)" : "transparent",
              color:
                tab === "bride" ? "var(--dev-accent-green)" : "var(--dev-text-dim)",
            }}
          >
            bride_team
          </button>
        </div>

        <div
          className="text-[13px] leading-relaxed sm:text-sm"
          style={{ color: "var(--dev-text)" }}
        >
          {people.map((person, i) => (
            <ContactRow key={i} person={person} />
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}
