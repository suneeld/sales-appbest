import React, { useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown"; // Install via: npm install react-markdown
import "./DIDAgent.css"; // Add styling

const DIDAgent = () => {
  const [agentData, setAgentData] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchAgentData = useCallback(() => {
    fetch("https://api.d-id.com/agents/agt_D1vqm_He", {
      method: "GET",
      headers: {
        Authorization:
          "Basic YzNWdVpEVTBRR2h2ZEcxaGFXd3VZMjl0OmNNb0R2SVdmelExZjY3VGhUVUllYQ==",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setAgentData(data))
      .catch((error) => {
        console.error("❌ API Error:", error);
        setError(error.message);
        if (retryCount < 3) {
          setRetryCount((prev) => prev + 1);
          setTimeout(fetchAgentData, 2000); // Retry after 2 seconds
        }
      });
  }, [retryCount]);

  useEffect(() => {
    fetchAgentData();
  }, [fetchAgentData]);

  if (error)
    return <p style={{ color: "red" }}>⚠️ Failed to load agent data. Retrying...</p>;
  if (!agentData) return <p>Loading D-ID Agent...</p>;

  return (
    <div className="did-agent-container">
      <h2>Meet Frank – Your AI Sales Coach</h2>
      {/* Display Thumbnail */}
      <img
        src={agentData.preview_thumbnail}
        alt="Agent Thumbnail"
        className="agent-thumbnail"
      />
      {/* Greeting */}
      <p>
        <strong>Greeting:</strong> {agentData.greetings[0]}
      </p>
      {/* Render Markdown Content */}
      <div className="agent-description">
        <ReactMarkdown>{agentData.preview_description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default DIDAgent;
