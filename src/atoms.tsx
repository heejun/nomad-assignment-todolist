import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["TO_DO", "DOING", "DONE"],
});

export const toDosState = atom<IToDo[]>({
  key: "todos",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const catetory = get(categoryState);
    return toDos.filter((item) => item.category === catetory);
  },
});
