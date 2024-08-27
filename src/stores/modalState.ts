import { atom } from "recoil";

export const modalState = atom<boolean>({
    key: "modalState",
    default: false,
});

export const orderModalState = atom<boolean>({
    key: "orderModalState",
    default: false,
});

export const returnModalState = atom<boolean>({
    key: "returnModalState",
    default: false,
});
