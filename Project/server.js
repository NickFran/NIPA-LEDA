const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', true); // respect X-Forwarded-For when behind proxies

// serve static files from "public" (optional)
app.use(express.static(path.join(__dirname, 'public')));

function getServerIp() {
    const ifaces = os.networkInterfaces();
    for (const name of Object.keys(ifaces)) {
        for (const iface of ifaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) return iface.address;
        }
    }
    return '127.0.0.1';
}

function ProcessCheck(clientIp) {
    // Placeholder for processing the client's IP address.
    // TODO: add validation, logging, blacklist/whitelist checks, geo lookup, etc.
    // Intentionally returns nothing.
    return;
}

// default route — return a blank page that displays the client's IP and the server's IP
app.get('/', (req, res) => {
    let clientIp = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || '';
    if (Array.isArray(clientIp)) clientIp = clientIp[0];
    clientIp = String(clientIp).split(',')[0].trim().replace('::ffff:', '');

    const serverIp = getServerIp();

    ProcessCheck(clientIp);

    res.send(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>IP</title>
</head>
<body style="margin:0;padding:20px;font-family:system-ui,Arial,Helvetica,sans-serif;background:#fff;color:#111;">
    <div style="max-width:480px;margin:0 auto;">
        <h1 style="font-size:1.1rem;margin:0 0 12px 0;">IP Information</h1>
        <p style="margin:6px 0;"><strong>Your IP:</strong> ${clientIp || 'unknown'}</p>
        <p style="margin:6px 0;"><strong>Server IP:</strong> ${serverIp}</p>
    </div>
</body>
</html>`);
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});