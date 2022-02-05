import { EditCommit, fetchCache, pushCommits, simplifyContent } from "../documents/mod.ts";
import { logger } from "../logger/mod.ts";
export class Room {
  private documentId: string;
  private sockets: Set<WebSocket>;
  private usersMap: Map<WebSocket, string>;
  private focusesMap: Map<string, { lineId: string; index: number }>;

  constructor(dockemtnId: string) {
    this.documentId = dockemtnId;

    this.sockets = new Set();
    this.usersMap = new Map();
    this.focusesMap = new Map();
  }

  addSocket(ws: WebSocket) {
    this.sockets.add(ws);

    ws.addEventListener("open", async () => {
      const content = await fetchCache(this.documentId);
      const pullData = JSON.stringify({ method: "PULL_DOCUMENT", payload: simplifyContent(content) });
      ws.send(pullData);
    });

    ws.addEventListener("message", async (event) => {
      const data = JSON.parse(event.data);
      switch (data.method) {
        case "PUSH_AUTH":
          await this.handlePushAuth(ws, data["userId"]);
          break;
        case "PUSH_COMMITS":
          await this.handlePushCommits(data["commits"]);
          break;
        case "PUSH_FOCUS":
          await this.handlePushFocus(data["focus"]);
          break;
      }
    });
  }

  private async handlePushCommits(commits: EditCommit[]) {
    const content = await pushCommits(this.documentId, commits, logger);

    this.broadcast({ method: "PULL_DOCUMENT", payload: simplifyContent(content) });
  }

  private handlePushAuth(ws: WebSocket, userId: string) {
    this.usersMap.set(ws, userId);
  }

  private handlePushFocus({ userId, data }: { userId: string; data: { lineId: string; index: number } }) {
    this.focusesMap.set(userId, data);

    this.broadcast({
      method: "SYNC_FOCUSES",
      focuses: Array.from(this.focusesMap.entries()).map(([userId, data]) => ({ userId, data })),
    });
  }

  private broadcast(data: Record<string, unknown>) {
    const sendData = JSON.stringify(data);
    this.sockets.forEach((target) => {
      if (target.readyState === WebSocket.OPEN) {
        target.send(sendData);
      }
    });
  }
}
