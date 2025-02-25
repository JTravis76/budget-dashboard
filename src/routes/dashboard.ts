import van from "vanjs-core";
import { DataSlicer } from "../components/data-slicer";
import { ChartOne } from "../components/chart-one";
import { ChartTwo } from "../components/chart-two";
//import { ChartThree } from "../components/chart-three";
import emitter from "../lib/event-emitter";
import $store from "../stores";

export const Dashboard = async () => {
  const { div } = van.tags;
  //---------------------------------------------
  await $store.dashboard.getAllTransactions();
  //---------------------------------------------
  let loading = van.state(true);
  //---------------------------------------------
  let slicers = await $store.dashboard.getSlicers();
  let dataSlicers = van.state(new Array<HTMLDivElement>());
  van.derive(() => {
    slicers.forEach((s) => dataSlicers.val.push(DataSlicer(s)));
    $store.dashboard.setSlicedTransactions(slicers);
  });
  loading.val = false;
  //---------------------------------------------
  emitter.subscribe("selection", (data: ISlicer) => {
    loading.val = true;
    dataSlicers.val = [];

    window.setTimeout(() => {
      van.derive(() => {

        slicers.forEach((s) => {
          if (s.title === data.title) {
            s = data;
          }
        });

        loading.val = false;
      });
    }, 500);
  });
  //---------------------------------------------
  return div(
    div({ class: "container mt-2" },
      div({ class: "columns" },
        div({ class: "column is-one-fifth" },
          () => loading.val
            ? div({ class: "skeleton-block" })
            : div(dataSlicers.val),
        ),
        div({ class: "column" },
          div({ class: "columns" },
            div({ class: "column" },
              div({ class: "card" },
                () => loading.val ? div({ class: "skeleton-block" }) : ChartOne(),
              ),
            ),
            div({ class: "column" },
              div({ class: "card" },
                () => loading.val ? div({ class: "skeleton-block" }) : ChartTwo(),
              ),
            ),
            // div({ class: "column" },
            //   div({ class: "card" },
            //     () => loading.val ? div({ class: "skeleton-block" }) : ChartThree(),
            //   ),
            // ),
          ),
        ),
      ),
    ),
  );
};