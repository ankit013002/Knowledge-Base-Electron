import React from "react";
import { AgentType } from "../types/agent-type";

interface AgentProps {
  agent: AgentType;
  onClose: (id: string) => void;
}

const Agent: React.FC<AgentProps> = ({ agent, onClose }) => {
  const shortId = agent.id.slice(0, 8).toUpperCase();
  const roleLabel = agent.role.charAt(0).toUpperCase() + agent.role.slice(1);

  return (
    <div className="flex flex-col w-80 rounded-xl border border-[var(--cf-border)] bg-[var(--cf-dark)] shadow-2xl overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--cf-medium)] border-b border-[var(--cf-border)]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/agent.svg"
              alt="Agent"
              width="36"
              height="36"
              className="rounded-full border border-[var(--cf-border)]"
            />
            {/* Live status dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[var(--cf-medium)] shadow-[0_0_6px_#34d399]" />
          </div>
          <div>
            <p className="text-[var(--cf-silver)] font-bold text-sm leading-tight">
              {roleLabel}
            </p>
            <p className="text-[var(--cf-accent)] text-xs font-mono opacity-80">
              #{shortId}
            </p>
          </div>
        </div>
        <button
          onClick={() => onClose(agent.id)}
          className="w-7 h-7 flex items-center justify-center rounded-md text-[var(--cf-silver)] hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 text-xs cursor-pointer"
          title="Remove agent"
        >
          ✕
        </button>
      </div>

      {/* Model + runtime info */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--cf-border)] bg-[var(--cf-darkest)]">
        <span className="text-xs text-[var(--cf-silver)] opacity-50 uppercase tracking-widest">
          Model
        </span>
        <span className="ml-auto px-2 py-0.5 rounded-full bg-[var(--cf-medium)] border border-[var(--cf-border)] text-[var(--cf-accent)] text-xs font-mono">
          {agent.model}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-[var(--cf-border)] border-b border-[var(--cf-border)]">
        {[
          { label: "Memory", value: "—" },
          { label: "Tools", value: "0" },
          { label: "Messages", value: "0" },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center py-2">
            <span className="text-[var(--cf-silver)] text-sm font-bold">
              {value}
            </span>
            <span className="text-[var(--cf-silver)] opacity-40 text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Activity / terminal area */}
      <div className="flex-1 px-4 py-3 bg-[var(--cf-darkest)] min-h-[80px] font-mono text-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399] animate-pulse" />
          <span className="text-emerald-400 text-xs">IDLE — Awaiting task</span>
        </div>
        <p className="text-[var(--cf-silver)] opacity-30 leading-relaxed">
          No messages yet. Connect this agent to a pipeline or send it a task to
          begin execution.
        </p>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--cf-medium)] border-t border-[var(--cf-border)]">
        <button className="flex-1 py-1.5 rounded-md text-xs font-semibold border border-[var(--cf-accent)]/40 text-[var(--cf-accent)] hover:bg-[var(--cf-accent)]/10 transition-all cursor-pointer">
          Configure
        </button>
        <button className="flex-1 py-1.5 rounded-md text-xs font-semibold border border-[var(--cf-border)] text-[var(--cf-silver)] hover:bg-[var(--cf-light)] transition-all cursor-pointer">
          View Logs
        </button>
      </div>
    </div>
  );
};

export default Agent;
