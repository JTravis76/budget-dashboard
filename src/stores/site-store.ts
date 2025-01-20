import van from "vanjs-core";
import localDb from "../lib/local-db";
import { useTagStore } from "./tag-store";

export const useSiteStore = () => {
  let pageloading = van.state(false);
  let tags = van.state(new Array<string>());
  //-------------------------------------------
  async function preloadData() {
    return Promise.all([
      localDb.initDB(),
      useTagStore().getTags(),
    ]);
  }
  //-------------------------------------------
  return {
    pageloading,
    tags,
    preloadData,
  };
}