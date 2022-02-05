import { getSockets } from "./get_sockets.ts";
import { fetchCache, pushCommits, releaseCache, simplifyContent } from "../documents/mod.ts";
import { logger } from "../logger/mod.ts";

export const addSocket = (documentId: string, ws: WebSocket) => {
  const sockets = getSockets(documentId);
  sockets.add(ws);

  ws.addEventListener("open", async () => {
    const content = await fetchCache(documentId);
    const pullData = JSON.stringify({ method: "PULL_DOCUMENT", payload: simplifyContent(content) });
    ws.send(pullData);
  });

  ws.addEventListener("message", async (event) => {
    const data = JSON.parse(event.data);

    if (data.method === "PUSH_COMMITS") {
      const payload = data.payload;

      const commits = payload["commits"];

      const content = await pushCommits(documentId, commits, logger);
      const pullData = JSON.stringify({ method: "PULL_DOCUMENT", payload: simplifyContent(content) });
      sockets.forEach((target) => {
        if (target.readyState === WebSocket.OPEN) target.send(pullData);
      });
    }
  });
};
