import { Room } from "./room.ts";

const rooms = new Map<string, Room>();

export const getRoom = (documentId: string) => {
  if (rooms.has(documentId)) {
    return rooms.get(documentId)!;
  } else {
    const newRoom = new Room(documentId);
    rooms.set(documentId, newRoom);
    return newRoom;
  }
};
