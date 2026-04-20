'use client';
import { useState, useEffect } from 'react';

export default function LivePage() {
  const [subtitle, setSubtitle] = useState('');
  const [language, setLanguage] = useState('es');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    ws.onopen = () => setIsConnected(true);
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setSubtitle(data.translation);
    };
    ws.onclose = () => setIsConnected(false);
    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Live Translation</h1>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="es">Español</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select>
      <div style={{ marginTop: '20px', fontSize: '24px', border: '1px solid #ccc', padding: '10px' }}>
        {isConnected ? subtitle : 'Connecting...'}
      </div>
    </div>
  );
}