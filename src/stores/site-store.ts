import $store from "./index";

export const useSiteStore = () => {
  //-------------------------------------------
  async function preload() {
    return Promise.all([
      $store.tag.getTags(),
      $store.tag.getRules(),
    ]);
  }
  //-------------------------------------------
  return {
    preload,
    version: "1.0.0"
  };
}