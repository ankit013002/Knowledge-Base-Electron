import { useState } from "react";
import Agent from "./agent/main";
import { AgentType } from "./types/agent-type";

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
    <div className="flex flex-wrap p-10 min-w-screen min-h-screen bg-carbon-background">
      <div className="w-full mb-8">
        <button className="btn btn-primary btn-lg" onClick={addAgent}>
          + Add Agent
        </button>
      </div>
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="card w-96 bg-carbon-primary shadow-xl m-4 border border-carbon-secondary"
        >
          <div className="card-body">
            <Agent agent={agent} onClose={removeAgent} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Layout;
