import { ulid } from "ulid";
import { nanoid } from "nanoid";
import { DocumentType } from "./types.ts";

export const documents: DocumentType[] = [
  {
    id: "doc_1",
    commits: [
      {
        type: "INIT",
        commitId: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
        previousCommitId: null,
        userId: "01FTD78WNZ2NGCWNTPN59YDKEM"
      },
    ],
    latestCommit: {
      type: "INIT",
      commitId: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
      previousCommitId: null,
      userId: "01FTD78WNZ2NGCWNTPN59YDKEM"
    },
    lines: [
      { lineId: nanoid(16), text: "こんにちは" },
      { lineId: nanoid(16), text: "さようなら" },
    ],
  },
];

export const getDocument = async (id: string) => {
  return documents.find((document) => document.id === id);
};
