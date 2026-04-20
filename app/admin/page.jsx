'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStream = async () => {
    setIsStreaming(true);
    const ws = new WebSocket('ws://localhost:3001');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'translate',
        text: text,
        targetLanguage: targetLanguage
      }));
    };
    ws.onclose = () => setIsStreaming(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Admin Panel - Conference Control</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter speech text here..."
        style={{ width: '100%', height: '150px', padding: '10px' }}
      />
      <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        <option value="es">Español</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select>
      <button onClick={handleStream} disabled={isStreaming} style={{ marginTop: '10px', padding: '10px 20px' }}>
        {isStreaming ? 'Streaming...' : 'Start Translation'}
      </button>
    </div>
  );
}