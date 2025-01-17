/* A Van.js chart component that wraps the Chart.js library.
 */
import van from "vanjs-core";
import { Chart, ChartConfiguration, registerables } from "chart.js";

const { canvas } = van.tags;

const createChart = (config: ChartConfiguration) => {
  Chart.register(...registerables);

  const chartCanvas = canvas({ width: "400", height: "400" });
  return new Chart(chartCanvas, config).canvas;
}

export default createChart;