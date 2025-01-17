/* This component is a bar chart used to display the total cash flow going in and going out.
 * We are using the proper library Charts.js to render our chart. First, we import the chart plugin.
 * This creates the HTML canvas element and register all the different chart types.
 * We fetch the sliced transactions (if any) from the store. Once the transactions are returned, we 
 * use a few utilities to help shape the data for the chart-dataset. This dataset is sent to Charts.js */
import { ChartDataset } from "chart.js";
import $chart from "../lib/chart";
import $store from "../stores";
import { sumBy, groupBy } from "../lib/utilities";

export const ChartOne = () => {
  let transactions = $store.dashboard.slicedTransactions.val;
  //--------------------------------------------- 
  let totalIn = 0;
  let totalOut = 0;

  let byTransaction = groupBy(transactions, "transaction");
  Object.keys(byTransaction).forEach((t) => {
    let sum = sumBy(byTransaction[t], "amount");
    if (t === "CREDIT")
      totalIn += parseInt(sum.toFixed(2), 10);
    else
      totalOut += parseInt(sum.toFixed(2), 10);
  });

  totalOut = Math.abs(totalOut);
  //---------------------------------------------
  const datasets = new Array<ChartDataset>();
  let r = 66;//Math.floor(Math.random() * 256).toString();
  let g = 88;//Math.floor(Math.random() * 256).toString();
  let b = 255;//Math.floor(Math.random() * 256).toString();

  datasets.push({
    label: "Totals",
    data: [totalIn, totalOut],
    backgroundColor: [`rgba(${r}, ${g}, ${b}, 0.2)`],
    borderColor: [`rgba(${r}, ${g}, ${b}, 1)`],
    borderWidth: 1,
    hoverBackgroundColor: [`rgba(${r}, ${g}, ${b}, 0.8)`],
  });
  //---------------------------------------------
  return $chart({
    type: "bar",
    data: {
      labels: ["In", "Out"],
      datasets: datasets,
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "In vs Out",
        },
      },
    },
  });
}