import { create } from "zustand";

type QueryStore = {
  search: string;
  setSearch: (value: string) => void;
};

const useQueryStore = create<QueryStore>((set) => ({
  search: "",
  setSearch: (value: string) => set(() => ({ search: value })),
}));

export default useQueryStore;
