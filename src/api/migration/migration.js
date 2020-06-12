import axios from "axios";
import * as d3 from "d3";

export default async () => {
  const { data, ...rest } = await axios.get(
    "https://4eo1w5jvy0.execute-api.us-east-1.amazonaws.com/default/migration_density"
  );

  const years = Object.keys(data[0]);

  const xAxis = d3.scaleLinear().domain([-10, 120]);

  const kernelDensityEstimator = (kernel, X) => (V) =>
    X.map((x) => [x, d3.mean(V, (v) => kernel(x - v))]);

  // eslint-disable-next-line no-return-assign
  const kernelEpanechnikov = (k) => (v) =>
    // eslint-disable-next-line no-cond-assign,no-param-reassign
    Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;

  const kde = kernelDensityEstimator(kernelEpanechnikov(7), xAxis.ticks(40));

  const densities = years.map((year) => ({
    year,
    density: kde(data.map((d) => d[year])),
  }));

  const myColor = d3
    .scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow);

  const means = years.map((year) => d3.mean(data, (datum) => +datum[year]));

  const cleanData = densities.map((datum, index) => ({
    ...datum,
    density: datum.density.map((d) => ({
      x: d[0],
      y: d[1] + densities.length - index * 0.03,
      y0: densities.length - index * 0.03,
    })),
    color: myColor(means[index]),
  }));

  return { data: { migration: cleanData }, rest };
};