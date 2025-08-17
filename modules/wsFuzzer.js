// modules/wsFuzzer.js
import WebSocket from 'ws';

export function generateFuzzedMessage(baseMessage, seed) {
    return baseMessage + Math.floor(Math.random() * seed);
}

export function fuzzWebSocket({ url, baseMessage, seed = 1000, count = 5, interval = 500 }) {
    console.log(`\x1b[36m[WS Fuzzer]\x1b[0m Connecting to ${url}`);
    const ws = new WebSocket(url);

    ws.on('open', () => {
        console.log('[WS] Connection opened');
        let sent = 0;
        const sendInterval = setInterval(() => {
            if (sent >= count) {
                clearInterval(sendInterval);
                ws.close();
                return;
            }
            const msg = generateFuzzedMessage(baseMessage, seed);
            ws.send(msg);
            console.log(`[WS] Sent: ${msg}`);
            sent++;
        }, interval);
    });

    ws.on('message', (data) => console.log(`[WS] Received: ${data}`));
    ws.on('error', (err) => console.error('[WS] Error:', err));
    ws.on('close', () => console.log('[WS] Connection closed'));
}
