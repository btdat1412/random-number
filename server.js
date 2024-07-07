/**
 * @file This file is used to create a custom Next.js server to handle WebSocket connections.
 * @see https://nextjs.org/docs/pages/building-your-application/configuring/custom-server
 * @see https://socket.io/how-to/use-with-nextjs
 * @createdBy Dat Phan
 * @createdAt 2024-07-07 17:02
 */

// import { createServer } from "node:http";
// import next from "next";
// import { Server } from "socket.io";
const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        // ...
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
