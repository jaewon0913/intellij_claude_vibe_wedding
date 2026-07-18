"use client";

import { useState } from "react";
import { invitationConfig } from "@/config/invitation.config";
import CopyButton from "@/components/ui/CopyButton";
import type { BankAccount } from "@/lib/types";
import Reveal from "@/components/ui/Reveal";

function AccountCard({ account }: { account: BankAccount }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3">
      <div className="min-w-0">
        <p className="text-xs text-ink-light">
          {account.bank} · {account.holder}
        </p>
        <p className="mt-0.5 truncate font-medium text-ink">
          {account.accountNumber}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {account.kakaopayLink && (
          <a
            href={account.kakaopayLink}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-full bg-accent-soft px-3 py-1.5 text-xs text-accent"
          >
            카카오페이
          </a>
        )}
        <CopyButton
          text={account.accountNumber}
          successMessage="계좌번호가 복사되었습니다"
          label={`${account.bank} 계좌번호 복사`}
        />
      </div>
    </div>
  );
}

export default function AccountInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const { groomSide, brideSide } = invitationConfig.accounts;

  return (
    <section className="bg-paper px-6 py-12 sm:px-10">
      <Reveal className="mx-auto max-w-md text-center">
        <p className="text-xs tracking-[0.35em] text-accent">GIFT</p>
        <h2 className="mt-4 font-serif text-2xl text-ink">마음 전하실 곳</h2>
        <p className="mt-3 text-sm text-ink-light">
            <br/>
            멀리서도 축하의 마음을<br/>
            전하고 싶으신 분들을 위해<br/>
            계좌번호를 안내드립니다.<br/>
            <br/>
            소중한 축하를 보내주셔서 감사드리며,<br/>
            따뜻한 마음에 깊이 감사드립니다.<br/>
        </p>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          className="mt-6 rounded-full border border-line px-6 py-2.5 text-sm text-ink transition hover:border-accent hover:text-accent"
        >
          {isOpen ? "계좌번호 접기" : "계좌번호 보기"}
        </button>

        {isOpen && (
          <div className="mt-8 space-y-8 text-left">
            <div>
              <p className="mb-3 text-xs font-medium tracking-widest text-ink-light">
                신랑측
              </p>
              <div className="space-y-2">
                {groomSide.map((account, i) => (
                  <AccountCard key={i} account={account} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium tracking-widest text-ink-light">
                신부측
              </p>
              <div className="space-y-2">
                {brideSide.map((account, i) => (
                  <AccountCard key={i} account={account} />
                ))}
              </div>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}
