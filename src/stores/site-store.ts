import van from "vanjs-core";
import http from "../api/swagger-client";
import localDb from "../lib/local-db";

export const useSiteStore = () => {
  let pageloading = van.state(false);
  let tags = van.state(new Array<string>());
  //-------------------------------------------
  async function preloadData() {
    return Promise.all([
      localDb.initDB(),
      getTags(),
    ]);
  }
  //-------------------------------------------
  async function getTags(): Promise<number> {
    tags.val = new Array<string>();
    return new Promise(async (r) => {
      tags.val = await http.tags.get();
      r(1);
    });
  }
  //-------------------------------------------
  return {
    pageloading,
    tags,
    preloadData,
    getTags,
  };
}