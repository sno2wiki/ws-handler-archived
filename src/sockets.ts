import { getDocument, pushCommits } from "./document.ts";
const socketsMap = new Map<string, Set<WebSocket>>();

export const getSockets = (docId: string): Set<WebSocket> => {
  if (socketsMap.has(docId)) {
    return socketsMap.get(docId) as Set<WebSocket>;
  } else {
    const newSet = new Set<WebSocket>();
    socketsMap.set(docId, newSet);
    return newSet;
  }
};

export const connect = (documentId: string, ws: WebSocket) => {
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
      await pushCommits(documentId, commits);
      broadcast(documentId);
    }
  });
};

export const broadcast = (documentId: string) => {
  const payload = getDocument(documentId);

  getSockets(documentId).forEach(
    (ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ method: "SYNC_DOCUMENT", payload }));
      }
    },
  );
};
