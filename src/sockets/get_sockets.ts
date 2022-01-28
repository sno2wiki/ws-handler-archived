import { socketsMap } from "./map.ts";
export const getSockets = (documentId: string): Set<WebSocket> => {
  if (socketsMap.has(documentId)) {
    return socketsMap.get(documentId) as Set<WebSocket>;
  } else {
    const newSet = new Set<WebSocket>();
    socketsMap.set(documentId, newSet);
    return newSet;
  }
};
