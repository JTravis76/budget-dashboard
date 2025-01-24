import van from "vanjs-core";
import http from "../api/swagger-client";

export const useTagStore = () => {
  let loading = van.state(true);
  let tags = van.state(new Array<string>());
  let rules = van.state([] as Record<string, IRuleProperty[]>[]);
  let rule = van.state({} as Record<string, IRuleProperty>);
  //-------------------------------------------
  async function getTags(): Promise<number> {
    tags.val = new Array<string>();
    return new Promise(async (r) => {
      tags.val = await http.tags.get();
      r(200);
    });
  }
  //-------------------------------------------
  function resetRule() {
    rule.val = {};
  }
  //-------------------------------------------
  function setRule(key: string, value: IRuleProperty) {
    resetRule();
    rule.val[key] = value;
  }
  //-------------------------------------------
  function removeRule(key: string, value: IRuleProperty) {
    loading.val = true;
    window.setTimeout(() => {
      resetRule();
      for (let i = 0; i < rules.val.length; i++) {
        let r = rules.val[i];
        let k = Object.keys(r)[0];
        let v = Object.values(r)[0];
        if (k === key) {
          v.forEach((p, idx) => {
            // found matching rule property, now remove it
            if (p.amount == value.amount && p.tag == value.tag) {
              v.splice(idx, 1);
            }
            // If last property is removed, then delete the entire rule
            if (v.length === 0) {
              rules.val.splice(i, 1);
            }
          });

          break;
        }
      }

      loading.val = false;
    }, 1000);
  }
  //-------------------------------------------
  async function getRules(): Promise<number> {
    rules.val = [] as Record<string, IRuleProperty[]>[];
    return new Promise(async (r) => {
      //TODO: using mock data, needs replaced
      rules.val.push({
        "Gas Station": [
          { amount: 0, tag: "Shopping" },
          { amount: 50.00, tag: "Shopping:Fuel" },
        ]
      });
      rules.val.push({
        "Wendy": [
          { amount: 0, tag: "Shopping:Dining" },
        ]
      });
      r(200);
    });
  }
  //-------------------------------------------
  async function addRule(key: string, value: IRuleProperty): Promise<number> {
    loading.val = true;
    return new Promise((r) => {
      window.setTimeout(() => {
        let tagProp = {} as Record<string, IRuleProperty[]>;
        tagProp[key] = [value];
        rules.val.push(tagProp);
        resetRule();
        loading.val = false;
        r(200);
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
    getRules,
    setRule,
    removeRule,
    resetRule,
    addRule,
    generateTag,
  };
}