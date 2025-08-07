import { atom } from "recoil";

export const contentsState = atom<{ _id: string; title: string; link: string; type: "Youtube" | "Twitter" | "Document" | "Link"}[]>({
    key: "contentsState",
    default: [],
  });