import { atom } from "recoil";

export const cartInfo = atom({
    key: "cart", // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });