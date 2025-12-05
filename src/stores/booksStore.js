// src/stores/booksStore.js
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { sendRequest } from "../utils/sendRequest";

export const useBooksStore = create(
  devtools(
    persist(
      (set, get) => ({
        booksData: { books: [], pageInfo: null },
        genres: [],
        filters: {
          genre: [],
          author: "",
          rating: "",
          sort: "",
        },
        isLoading: false,
        error: "",

        setError: (err) => set({ error: err?.message || String(err) }),
        setIsLoading: (val) => set({ isLoading: val }),
        setFilters: (next) => set({ filters: { ...get().filters, ...next } }),
        clearFilters: () =>
          set({
            filters: {
              genre: [],
              author: "",
              averageRating: "",
              sortBy: "",
            },
          }),
        setBooksData: (newData) => set({ booksData: newData }),

        appendBooksPage: (page) =>
          set((s) => ({
            booksData: {
              books: [...(s.booksData.books || []), ...(page.books || [])],
              pageInfo: page.pageInfo || null,
            },
          })),

        fetchBooks: async (params = {}) => {
          try {
            set({ isLoading: true, error: "" });
            console.log(params);
            const res = await sendRequest({
              url: "/books",
              method: "get",
              params,
            });
            const payload = {
              books: res.books || [],
              pageInfo: res.pageInfo || null,
            };
            set({ booksData: payload, isLoading: false });
          } catch (err) {
            set({ isLoading: false, error: err?.message || String(err) });
            throw err;
          }
        },

        loadMore: async () => {
          try {
            const { pageInfo } = get().booksData || {};
            if (!pageInfo?.nextCursor) return null;
            set({ isLoading: true, error: "" });
            const params = { ...get().filters, after: pageInfo.nextCursor };
            const res = await sendRequest({
              url: "/books",
              method: "get",
              params,
            });
            const page = {
              books: res.books || [],
              pageInfo: res.pageInfo || null,
            };
            get().appendBooksPage(page);
            set({ isLoading: false });
            return page;
          } catch (err) {
            set({ isLoading: false, error: err?.message || String(err) });
            throw err;
          }
        },

        getGenres: async () => {
          try {
            const res = await sendRequest({ url: "/books/genres" });
            set({ genres: res.genres || [] });
            return res.genres || [];
          } catch (err) {
            set({ error: err?.message || String(err) });
            throw err;
          }
        },

        clearStore: () =>
          set({
            booksData: { books: [], pageInfo: null },
            genres: [],
            filters: {
              genre: [],
              author: "",
              averageRating: "",
              sortBy: "",
            },
            isLoading: false,
            error: "",
          }),
      }),
      {
        name: "books",
      }
    )
  )
);
