import { bold, yellow } from "std/fmt/colors";
import { oakCors } from "cors";
import { Application, Router } from "oak";

import { createDocument, findDocument, parseDocument } from "./documents/mod.ts";
import { addSocket } from "./sockets/mod.ts";

const app = new Application();
const router = new Router();

createDocument("eKfn8xhyQg68Pe1E", "01FTD78WNZ2NGCWNTPN59YDKEM");
router.get("/docs/:id", async (context) => {
  const documentId = context.params["id"];
  const document = await findDocument(documentId);

  if (!document) {
    context.response.status = 404;
    return;
  }
  context.response.body = parseDocument(document);
});

router.post("/docs/:id/create", async (context) => {
  const documentId = context.params["id"];

  const newDocument = await createDocument(documentId, "01FTD78WNZ2NGCWNTPN59YDKEM");
  context.response.body = newDocument;
});

router.get("/docs/:id/edit", async (context) => {
  const documentId = context.params["id"];

  if (!await findDocument(documentId)) {
    context.response.status = 404;
    return;
  }

  const ws = await context.upgrade();
  addSocket(documentId, ws);
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
