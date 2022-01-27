import { bold, yellow } from "std/fmt/colors";
import { oakCors } from "cors";
import { Application, Router } from "oak";

import { createDocument, getDocument } from "./document.ts";

const app = new Application();
const router = new Router();
router.get("/docs/:id", async (context) => {
  const documentId = context.params["id"];
  const document = await getDocument(documentId);

  context.response.status = 404;
  context.response.body = document;
});

router.post("/docs/:id/create", async (context) => {
  const documentId = context.params["id"];

  const newDocument = await createDocument(documentId, "01FTD78WNZ2NGCWNTPN59YDKEM");
  context.response.body = newDocument;
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
