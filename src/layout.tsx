import { useState } from "react";
import Agent from "./agent/main";
import { AgentType } from "./types/agent-type";
import { IoIosAddCircleOutline } from "react-icons/io";

const Layout = () => {
  const [agents, setAgents] = useState<AgentType[]>([]);

  const addAgent = () => {
    setAgents([
      ...agents,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        model: "gpt-3.5-turbo",
      },
    ]);
  };

  const removeAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

  return (
    <div className="flex flex-col min-w-screen min-h-screen p-5">
      <div>
        <button
          className="flex items-center gap-3 px-6 py-3 rounded-lg border-2 border-[var(--cf-accent)] bg-[var(--cf-medium)] hover:bg-[var(--cf-light)] hover:shadow-lg hover:shadow-[var(--cf-accent)]/20 transition-all duration-300 cursor-pointer group"
          onClick={addAgent}
          title="Add a new agent"
        >
          <IoIosAddCircleOutline className="w-6 h-6 text-[var(--cf-accent)] group-hover:scale-110 transition-transform" />
          <img
            src="/agent.svg"
            alt="Agent"
            width="28"
            height="28"
            className="group-hover:scale-110 transition-transform"
          />
          <span className="text-[var(--cf-silver)] font-semibold text-sm">
            Add Agent
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        {agents.map((agent) => (
          <Agent key={agent.id} agent={agent} onClose={removeAgent} />
        ))}
      </div>
    </div>
  );
};

export default Layout;
