const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const ttsService = require('./services/ttsService');
const translationService = require('./services/translationService');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            if (data.type === 'translate') {
                const translation = await translationService.translate(data.text, data.targetLanguage);
                const audioStream = await ttsService.synthesize(translation, data.targetLanguage);

                ws.send(JSON.stringify({ type: 'translation', text: translation, language: data.targetLanguage }));

                audioStream.on('data', (chunk) => {
                    ws.send(chunk, (err) => {
                        if (err) console.error('Error sending audio:', err);
                    });
                });
            }
        } catch (error) {
            console.error('Error:', error);
            ws.send(JSON.stringify({ type: 'error', message: error.message }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
