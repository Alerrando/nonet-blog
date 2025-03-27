import { ArticleModel } from "@/models/ArticleModel";
import { openDB } from "idb";

const DB_NAME = "blog-database";
const STORE_NAME = "blog-store";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      store.createIndex("name", "name", { unique: false });
    }
  },
});

export const addItem = async (item: ArticleModel) => {
  const db = await dbPromise;
  return db.add(STORE_NAME, item);
};

export const getAllItems = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const deleteItem = async (id: string) => {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
};
