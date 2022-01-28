import { broadcast } from "./broadcast.ts";
import { getSockets } from "./get_sockets.ts";
import { getDocument, pushCommits } from "../documents/mod.ts";
export const addSocket = (documentId: string, ws: WebSocket) => {
  const socketsSet = getSockets(documentId);
  socketsSet.add(ws);

  ws.addEventListener("open", async () => {
    await broadcast(documentId);
  });

  ws.addEventListener("message", async (event) => {
    const data = JSON.parse(event.data);

    if (data.method === "PUSH_COMMITS") {
      const payload = data.payload;

      const commits = payload["commits"];

      const document = getDocument(documentId);

      await pushCommits(document, commits);
      broadcast(documentId);
    }
  });
};
