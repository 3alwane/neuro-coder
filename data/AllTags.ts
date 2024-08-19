import { v4 as uuidv4 } from "uuid";

export interface Tag {
  _id: string;
  name: string;
}
export const allTagsData = [
  { _id: uuidv4(), name: "string" },
  { _id: uuidv4(), name: "math" },
  { _id: uuidv4(), name: "loop" },
];
