"use client";

import { useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import type { BankAccount } from "@/lib/types";
import TerminalWindow from "./TerminalWindow";
import Reveal from "@/components/ui/Reveal";

function AccountRow({ account }: { account: BankAccount }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("계좌번호 복사 실패:", err);
    }
  };

  return (
    <div
      className="flex items-center justify-between gap-2 border-b py-3 last:border-b-0"
      style={{ borderColor: "var(--dev-border)" }}
    >
      <span
        className="shrink-0 text-sm font-semibold"
        style={{ color: "var(--dev-text)" }}
      >
        {account.holder}
      </span>

      <div className="min-w-0 flex-1 text-center">
        <p className="text-xs" style={{ color: "var(--dev-text-dim)" }}>
          {account.bank}
        </p>
        <p
          className="truncate text-[13px] sm:text-sm"
          style={{ color: "var(--dev-text)" }}
        >
          {account.accountNumber}
        </p>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded border px-2 py-1 text-[11px] transition hover:opacity-80"
        style={{
          borderColor: "var(--dev-border)",
          color: copied ? "var(--dev-accent-green)" : "var(--dev-text-dim)",
        }}
      >
        {copied ? "copied!" : "copy"}
      </button>
    </div>
  );
}

function AccountGroup({
  label,
  color,
  accounts,
}: {
  label: string;
  color: string;
  accounts: BankAccount[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-1 text-left"
      >
        <span className="text-xs" style={{ color }}>
          {label}
        </span>
        <span
          className="text-xs transition-transform"
          style={{
            color: "var(--dev-text-dim)",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          ›
        </span>
      </button>

      {isOpen && (
        <div className="mt-1">
          {accounts.map((account, i) => (
            <AccountRow key={i} account={account} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DevAccounts() {
  const { groomSide, brideSide } = invitationConfig.accounts;

  return (
    <section className="px-4 py-6 sm:px-6">
      <Reveal>
        <TerminalWindow title=".env.gift - 마음 전하실 곳">
          <div className="space-y-3">
            <AccountGroup
              label="groom.team"
              color="var(--dev-accent-blue)"
              accounts={groomSide}
            />
            <AccountGroup
              label="bride.team"
              color="var(--dev-accent-pink)"
              accounts={brideSide}
            />
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
