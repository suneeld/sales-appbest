import { useEffect } from 'react';

const DIDAgent = ({ customText }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://agent.d-id.com/v1/index.js';
    script.setAttribute('crossorigin', 'anonymous'); // Allow cross-origin assets
    script.setAttribute('data-name', 'did-agent');
    script.setAttribute('data-client-key', 'YXV0aDB8Njc5ZGQzZWIwNWY0ZWU1NGU5NzE1MjgwOnJ6MkFBc29qZ3NINXQwRkZTNS1RQg==');
    script.setAttribute('data-agent-id', 'agt_D1vqm_He');
    script.setAttribute('data-monitor', 'true');
    
    // Pass the custom text to Frank (the D-ID agent) through the script.
    if (customText) {
      script.setAttribute('data-custom-text', customText);
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [customText]);

  return (
    <div>
      {/* The D-ID agent will be embedded dynamically here */}
    </div>
  );
};

export default DIDAgent;
