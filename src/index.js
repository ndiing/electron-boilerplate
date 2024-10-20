require("@ndiinginc/env")('.env',{
    HTTP_PORT:80,
    HTTPS_PORT:443,
    HOSTNAME:'localhost',
    HTTP_PROXY:'http://127.0.0.1:8888',
});
const express = require("express");
const { getCertsForHostname } = require("@ndiinginc/cert");
const http = require("http");
const https = require("https");
const { redirect } = require("./middleware/index.js");
const { WebSocketServer } = require("ws");

const options = getCertsForHostname("localhost");
const app = express();

// app.use(redirect());
app.use("/api", require("./api/index.js"));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

const ws = new WebSocketServer({ noServer: true });
const wss = new WebSocketServer({ noServer: true });

function handleConnection(socket, req) {
    socket.on("error", console.log);
    socket.on("message", console.log);
}

function handleUpgrade(ws) {
    return (req, socket, head) => {
        ws.handleUpgrade(req, socket, head, (sock) => {
            ws.emit("connection", sock, req);
        });
    };
}

ws.on("connection", handleConnection);
wss.on("connection", handleConnection);

httpServer.on("upgrade", handleUpgrade(ws));
httpsServer.on("upgrade", handleUpgrade(wss));

httpServer.listen(process.env.HTTP_PORT, "0.0.0.0", () => console.log(httpServer.address()));
httpsServer.listen(process.env.HTTPS_PORT, "0.0.0.0", () => console.log(httpsServer.address()));
