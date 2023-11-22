import { atom, selector, useRecoilValue } from "recoil";
import { CategoryType } from "types";

// export const categoriesState = atom<CategoryType[]>({
//   key: "CategoriesState",
//   default: selector({
//     key: "initialCategoriesState",
//     get: async () => await fetch("http://localhost:3001/api/categories").then((res) => res.json()),
//   }),
// });

export const categoriesState = atom({
  key: "categoryState",
  default: [],
});

// const categoriesSelector = selector({
//   key: "categoriesSelector",
//   get: ({ get }) => get(categoriesState),
// });

// export const categoriesSelectors = {
//   useGetCategories: () => useRecoilValue(categoriesSelector),
// };
