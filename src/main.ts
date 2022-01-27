import { bold, yellow } from "std/fmt/colors";
import { oakCors } from "cors";
import { Application, Router } from "oak";

import { ulid } from "ulid";
import { nanoid } from "nanoid";

import { documents, getDocument } from "./document.ts";

const app = new Application();
const router = new Router();
router.get("/docs/:id", async (context) => {
  const pageId = context.params["id"];

  context.response.body = {
    pageId: pageId,
    latestCommitId: ulid(),
    lines: [
      { lineId: nanoid(16), text: "こんにちは" },
      { lineId: nanoid(16), text: "さようなら" },
    ],
  };
});

router.get("/docs/:id/edit", async (context) => {
  const documentId = context.params["id"];

  const ws = await context.upgrade();

  ws.addEventListener("open", async () => {
    const storedDocument = await getDocument(documentId);
    if (storedDocument) {
      ws.send(JSON.stringify(
        {
          method: "INIT",
          payload: {
            documentId: storedDocument.id,
            latestCommit: storedDocument.latestCommit,
            lines: storedDocument.lines,
          },
        },
      ));
    } else {
      ws.send(JSON.stringify(
        {
          method: "NOT_FOUND",
          payload: null,
        },
      ));
    }
  });

  ws.addEventListener("message", (event) => {
    console.dir(event.data);
  });
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(bold(`Start listening on: ${yellow(`${hostname}:${port}`)}`));
  console.log(bold(`using HTTP server: ${yellow(serverType)}`));
});

await app.listen({
  port: parseInt(Deno.env.get("PORT") || "8000", 10),
});
console.log(bold("Finished."));
