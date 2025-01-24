import van from "vanjs-core";
import localDb from "../lib/local-db";
import $store from "./index";

export const useSiteStore = () => {
  let pageloading = van.state(false);
  let tags = van.state(new Array<string>());
  //-------------------------------------------
  async function preloadData() {
    return Promise.all([
      localDb.initDB(),
      $store.tag.getTags(),
      $store.tag.getRules(),
    ]);
  }
  //-------------------------------------------
  return {
    pageloading,
    tags,
    preloadData,
  };
}