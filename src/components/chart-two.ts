import { ChartDataset } from "chart.js";
import $chart from "../lib/chart";

export const ChartTwo = () => {
  const datasets = new Array<ChartDataset>();
  let r = Math.floor(Math.random() * 256).toString();
  let g = Math.floor(Math.random() * 256).toString();
  let b = Math.floor(Math.random() * 256).toString();

  datasets.push({
    label: "Series",
    data: [],
    backgroundColor: [`rgba(${r}, ${g}, ${b}, 0.2)`],
    borderColor: [`rgba(${r}, ${g}, ${b}, 1)`],
    borderWidth: 1,
    hoverBackgroundColor: [`rgba(${r}, ${g}, ${b}, 0.8)`],
  });

  return $chart({
    type: "line",
    data: {
      labels: ["labels"],
      datasets: datasets,
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Title",
        },
      },
    },
  });
}