import React from "react";
import { AgentType } from "../types/agent-type";

interface AgentProps {
  agent: AgentType;
  onClose: (id: string) => void;
}

const Agent: React.FC<AgentProps> = ({ agent, onClose }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-carbon-highlight mb-2">
            {agent.role.charAt(0).toUpperCase() + agent.role.slice(1)}
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-carbon-text">
              <span className="text-carbon-accent font-semibold">Model:</span>{" "}
              {agent.model}
            </p>
            <p className="text-carbon-text break-all">
              <span className="text-carbon-accent font-semibold">ID:</span>
              <br />
              <code className="text-xs text-carbon-highlight">{agent.id}</code>
            </p>
          </div>
        </div>
        <button
          onClick={() => onClose(agent.id)}
          className="btn btn-sm btn-error ml-2 mb-1"
          title="Close agent"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 bg-carbon-background rounded p-3 border border-carbon-secondary">
        <p className="text-xs text-carbon-text opacity-75">
          Agent ready for interaction
        </p>
      </div>
    </div>
  );
};

export default Agent;
