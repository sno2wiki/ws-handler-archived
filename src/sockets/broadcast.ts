import { getDocument, parseDocument } from "../documents/mod.ts";
import { getSockets } from "./get_sockets.ts";

export const broadcast = (documentId: string) => {
  const sockets = getSockets(documentId);

  const documentPayload = parseDocument(getDocument(documentId));

  const sendData = JSON.stringify({
    method: "PULL_DOCUMENT",
    payload: {
      document: documentPayload,
    },
  });

  sockets.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) ws.send(sendData);
  });
};
