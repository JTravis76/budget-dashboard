import van from "vanjs-core";
import $http from "../api/swagger-client";
import { Slicer, SlicerData } from "../models";
import { tags } from "../api/services/data";
import { buildDateList } from "../lib/date";

export const useDashboardStore = () => {
  let transactions = van.state(new Array<ITransaction>());
  let slicedTransactions = van.state(new Array<ITransaction>());
  //-------------------------------------------
  async function getAllTransactions() {
    return new Promise<number>(async (r) => {
      transactions.val = await $http.transactions.getAll();
      r(200);
    });
  }
  //-------------------------------------------
  async function getSlicers() {
    return new Promise<Slicer[]>((r) => {
      let slicers = new Array<ISlicer>();

      slicers.push(new Slicer({ title: "Name", data: "" }));

      // build data-range from the 1st and last records
      let slicerData = new Array<ISlicerData>();
      if (transactions.val.length > 0) {
        let end = transactions.val[0].dttm ?? "";
        let start = transactions.val[transactions.rawVal.length - 1].dttm ?? "";
        slicerData = buildDateList(start, end);
      }

      slicers.push(new Slicer({
        title: "Date",
        data: slicerData,
      }));

      slicers.push(new Slicer({
        title: "Tag",
        data: tags.map((t) => new SlicerData({ text: t, value: t, selected: false })),
      }));
      r(slicers);
    });
  }
  //-------------------------------------------
  function setSlicedTransactions(slicers: ISlicer[]) {
    let result = transactions.val;
    slicers
      .filter((x) => x.active)
      .forEach((x) => {
        // Process each 'Active' slicer in the same order that is created.
        // Order of operations is important !!

        if (typeof x.data === "string" && x.title === "Name") {
          let search = x.data.toUpperCase();
          result = result.filter((t) => t.name.toUpperCase().includes(search))
        }
        else if (Array.isArray(x.data)) {

          if (x.title === "Date") {
            let mth = new Array<number>();
            let yrs = new Array<number>();

            x.data
              .filter((x) => x.selected)
              .forEach((s) => {
                let res = s.value.split("-");
                yrs.push(parseInt(res[0], 10));
                mth.push(parseInt(res[1], 10));
              });
            yrs = [...new Set(yrs)];

            result = result.filter((t) => {
              let dttm = new Date(t.dttm ?? "");
              return mth.includes(dttm.getMonth() + 1) && yrs.includes(dttm.getFullYear());
            });
          }

          if (x.title === "Tag") {
            let tag = new Array<string>();

            x.data
              .filter((x) => x.selected)
              .forEach((s) => {
                tag.push(s.value);
              });

            result = result
              .filter((t) => tag.includes(t.tag ?? "do-not-add"));
          }

        }
      });
    slicedTransactions.val = result;
  }
  //-------------------------------------------
  return {
    slicedTransactions,
    transactions,
    getSlicers,
    getAllTransactions,
    setSlicedTransactions,
  };
}