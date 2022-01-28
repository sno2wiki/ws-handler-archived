export type LineType = { lineId: string; text: string };

export type InitCommitType = {
  type: "INIT";

  commitId: string;
  previousCommitId: null;

  userId: string;
};
type JoinCommitType = {
  type: "JOIN";

  commitId: string;
  previousCommitId: string;

  userId: string;
};
type EditCommitType = {
  type: "EDIT";

  commitId: string;
  previousCommitId: string;

  userId: string;
};

export type CommitType = (
  | InitCommitType
  | JoinCommitType
  | EditCommitType
);
export type DocumentType = {
  id: string;
  commits: CommitType[];
  latestCommit: CommitType;
  lines: LineType[];
};

export type ActualDocument = {
  documentId: string;
  latestCommit: CommitType;
  lines: LineType[];
};
