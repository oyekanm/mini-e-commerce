import { atom } from "recoil";

export const faveInfo = atom({
    key: "favorites", // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });