import { useEffect, useRef, useState } from "react";

function App() {
  const [log, setLog] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3000');
    ws.current.onmessage = (event) => {
      setLog((prev) => [...prev, event.data]);
    };
    ws.current.onopen = () => {
      setLog((prev) => [...prev, 'Connected']);
    };
    ws.current.onclose = () => {
      setLog((prev) => [...prev, 'Disconnected']);
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && input.trim()) {
      ws.current.send(input);
      setLog((prev) => [...prev, `Sent: ${input}`]);
      setInput('');
    }
  };

return (
  <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
    <h1>Serial UI</h1>
    <div style={{ marginBottom: '1rem' }}>
      <textarea
        rows={10}
        cols={60}
        value={log.join('\n')}
        readOnly
        style={{ width: '100%', resize: 'none' }}
      />
    </div>
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Enter message"
      style={{ width: '70%' }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage();
        }
      }}
    /> 
    <button onClick={sendMessage} style={{ marginLeft: '1rem' }}>
      Send
    </button>
  </div>
);
}

export default App;