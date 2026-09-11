"use client";

import { useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import type { BankAccount } from "@/lib/types";
import TerminalWindow from "./TerminalWindow";
import Reveal from "@/components/ui/Reveal";

function envKey(prefix: string, index: number): string {
  return `${prefix}_ACCOUNT_${index + 1}`;
}

function AccountLine({
  envName,
  account,
}: {
  envName: string;
  account: BankAccount;
}) {
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
    <div>
      <span style={{ color: "var(--dev-accent-pink)" }}>{envName}</span>
      <span style={{ color: "var(--dev-text-dim)" }}>=</span>
      <span style={{ color: "var(--dev-accent-green)" }}>
        &quot;{account.bank} {account.accountNumber} ({account.holder})&quot;
      </span>{" "}
      <button
        type="button"
        onClick={handleCopy}
        className="rounded border px-1.5 py-0.5 text-[10px] transition hover:opacity-80"
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

export default function DevAccounts() {
  const { groomSide, brideSide } = invitationConfig.accounts;

  return (
    <section className="px-4 py-6 sm:px-6">
      <Reveal>
        <TerminalWindow title=".env.gift - 마음 전하실 곳">
          <div
            className="space-y-1.5 text-[13px] leading-relaxed sm:text-sm"
            style={{ color: "var(--dev-text)" }}
          >
            <p style={{ color: "var(--dev-text-dim)" }}># GROOM</p>
            {groomSide.map((account, i) => (
              <AccountLine
                key={i}
                envName={envKey("GROOM", i)}
                account={account}
              />
            ))}

            <p className="mt-3" style={{ color: "var(--dev-text-dim)" }}>
              # BRIDE
            </p>
            {brideSide.map((account, i) => (
              <AccountLine
                key={i}
                envName={envKey("BRIDE", i)}
                account={account}
              />
            ))}
          </div>
        </TerminalWindow>
      </Reveal>
    </section>
  );
}
