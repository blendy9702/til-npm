import { atom } from "recoil";

export const productAtom = atom({
  key: "productState",
  default: [
    {
      id: 1,
      name: "커피",
      price: "100",
    },
    {
      id: 2,
      name: "딸기",
      price: "50",
    },
    {
      id: 3,
      name: "참외",
      price: "200",
    },
  ],
});
