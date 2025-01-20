import van from "vanjs-core";
import http from "../api/swagger-client";

export const useTagStore = () => {
  let tags = van.state(new Array<string>());
  let rules = van.state(new Array<IRuleProperty>())
  //-------------------------------------------
  async function getTags(): Promise<number> {
    tags.val = new Array<string>();
    return new Promise(async (r) => {
      tags.val = await http.tags.get();
      r(200);
    });
  }
  //-------------------------------------------
  async function addRule(rule: IRuleProperty): Promise<number> {
    return new Promise((r) => {
      rules.val.push(rule);
      r(200);
    });
  }
  //-------------------------------------------
  async function assignTag(trans: ITransaction): Promise<string> {
    return new Promise((r) => {
      let tag = "";
      for (let i = 0; i < listOfRules.length; i++) {
        const rule = listOfRules[i];
        let name = Object.keys(rule)[0];

        // == 1st step of the rule
        if (trans.name.includes(name)) {

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
      r(tag);
    });
  }
  //-------------------------------------------
  return {
    tags,
    getTags,
    addRule,
    assignTag,
  };
}