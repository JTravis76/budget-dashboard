import van from "vanjs-core";
import http from "../api/swagger-client";

export const useTagStore = () => {
  let loading = van.state(true);
  let tags = van.state(new Array<string>());
  let rules = van.state([] as ITagProperty[]);
  let rule = van.state({ "": { amount: 0, tag: "" } } as Record<string, IRuleProperty>);
  //-------------------------------------------
  async function getTags(): Promise<number> {
    tags.val = new Array<string>();
    return new Promise(async (r) => {
      tags.val = await http.tags.get();
      r(200);
    });
  }
  //-------------------------------------------
  function importTags(tags: string[]) {
    loading.val = true;
    window.setTimeout(() => {

      http.tags.importTags(tags)
        .then((res) => {
          if (res == 200) {
            getTags().then(() => loading.val = false)
          }
        });

    }, 1000);
  }
  //-------------------------------------------
  function resetRule() {
    rule.val = { "": { amount: 0, tag: "" } };
  }
  //-------------------------------------------
  function setRule(key: string, value: IRuleProperty) {
    rule.val = {};
    rule.val[key] = value;
  }
  //-------------------------------------------
  function removeRule(key: string, value: IRuleProperty) {
    loading.val = true;
    window.setTimeout(() => {

      http.rules.deleteBy(key, value)
        .then((res) => {
          if (res == 200) {
            resetRule();
            getRules().then(() => loading.val = false)
          }
        });

    }, 1000);
  }
  //-------------------------------------------
  function importRules(rules: ITagProperty[]) {
    loading.val = true;
    window.setTimeout(() => {

      http.rules.importRules(rules)
        .then((res) => {
          if (res == 200) {
            resetRule();
            getRules().then(() => loading.val = false)
          }
        });

    }, 1000);
  }
  //-------------------------------------------
  async function getRules(): Promise<number> {
    rules.val = [];
    return new Promise(async (r) => {
      rules.val = await http.rules.get();
      r(200);
    });
  }
  //-------------------------------------------
  async function saveRule(key: string, value: IRuleProperty): Promise<number> {
    loading.val = true;
    return new Promise((r) => {
      window.setTimeout(() => {
        http.rules.post(key, value)
          .then(() => {
            resetRule();
            getRules();
            loading.val = false;
            r(200);
          });
      }, 1000);
    });
  }
  //-------------------------------------------
  function generateTag(trans: ITransaction): string {
    let tag = "";
    for (let i = 0; i < rules.val.length; i++) {
      const rule = rules.val[i];
      let name = Object.keys(rule)[0];

      // == 1st step of the rule
      if (trans.name.toUpperCase().includes(name.toUpperCase())) {

        // == 2nd step:
        // sort the amount rule DESC and if greater, set tag value
        Object.values(rule)[0]
          .sort((a, b) => a.amount < b.amount ? 1 : -1)
          .forEach((property) => {
            if (tag === "" && Math.abs(trans.amount) > property.amount)
              tag = property.tag;
          });

        if (tag !== "") break;
      }
    }
    return tag;
  }
  //-------------------------------------------
  return {
    loading,
    tags,
    rules,
    rule,
    getTags,
    importTags,
    getRules,
    setRule,
    removeRule,
    importRules,
    resetRule,
    saveRule,
    generateTag,
  };
}