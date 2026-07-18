"use client";

import { useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import type { Person } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5.5C3 4.67 3.67 4 4.5 4H8l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3.5c0 .83-.67 1.5-1.5 1.5C9.4 20 3 13.6 3 5.5Z"
      />
    </svg>
  );
}

function SmsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5h16v10H8l-4 4V5Z"
      />
    </svg>
  );
}

function ContactCard({ person }: { person: Person }) {
  // 신랑/신부 본인은 가장 눈에 띄게, 부모님 항목은 살짝 덜 강조되게 표시
  const isPrimary = person.relation === "신랑" || person.relation === "신부";

  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
        isPrimary ? "border-accent/40 bg-accent-soft/40" : "border-line"
      }`}
    >
      <div>
        <p
          className={
            isPrimary
              ? "text-xs font-medium text-accent"
              : "text-xs text-ink-light"
          }
        >
          {person.relation}
        </p>
        <p
          className={
            isPrimary
              ? "mt-0.5 font-serif text-lg text-ink"
              : "mt-0.5 text-sm text-ink"
          }
        >
          {person.name}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={`tel:${person.phone}`}
          aria-label={`${person.name}에게 전화`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-light transition hover:border-accent hover:text-accent"
        >
          <PhoneIcon />
        </a>
        <a
          href={`sms:${person.phone}`}
          aria-label={`${person.name}에게 문자`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-light transition hover:border-accent hover:text-accent"
        >
          <SmsIcon />
        </a>
      </div>
    </div>
  );
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");
  const { groomSide, brideSide } = invitationConfig.contacts;
  const people = activeTab === "groom" ? groomSide : brideSide;

  return (
    <section className="bg-paper px-6 py-12 sm:px-10">
      <Reveal className="mx-auto max-w-md">
        <p className="text-center text-xs tracking-[0.35em] text-accent">
          CONTACT
        </p>
        <h2 className="mt-4 text-center font-serif text-2xl text-ink">
          연락하기
        </h2>

        <div className="mt-8 flex rounded-full border border-line p-1">
          <button
            type="button"
            onClick={() => setActiveTab("groom")}
            aria-pressed={activeTab === "groom"}
            className={`flex-1 rounded-full py-2 text-sm transition ${
              activeTab === "groom"
                ? "bg-ink text-paper"
                : "text-ink-light"
            }`}
          >
            신랑측
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("bride")}
            aria-pressed={activeTab === "bride"}
            className={`flex-1 rounded-full py-2 text-sm transition ${
              activeTab === "bride"
                ? "bg-ink text-paper"
                : "text-ink-light"
            }`}
          >
            신부측
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {people.map((person, i) => (
            <ContactCard key={i} person={person} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
