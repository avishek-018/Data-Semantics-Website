import React from 'react';
import Plot from 'react-plotly.js';

export default function TorusPlot() {
  const thetaSteps = 30;
  const phiSteps = 30;
  const R = 10; // Major radius
  const r = 1; // Minor radius

  const theta = Array.from({ length: thetaSteps }, (_, i) => (2 * Math.PI * i) / thetaSteps);
  const phi = Array.from({ length: phiSteps }, (_, i) => (2 * Math.PI * i) / phiSteps);

  const x = [];
  const y = [];
  const z = [];
  const lines = [];

  // Generate circular grid for the wireframe
  theta.forEach((t) => {
    const xRow = [];
    const yRow = [];
    const zRow = [];
    phi.forEach((p) => {
      xRow.push((R + r * Math.cos(p)) * Math.cos(t));
      yRow.push((R + r * Math.cos(p)) * Math.sin(t));
      zRow.push(r * Math.sin(p));
    });
    x.push(...xRow);
    y.push(...yRow);
    z.push(...zRow);
    lines.push({
      x: xRow,
      y: yRow,
      z: zRow,
    });
  });

  phi.forEach((p) => {
    const xRow = [];
    const yRow = [];
    const zRow = [];
    theta.forEach((t) => {
      xRow.push((R + r * Math.cos(p)) * Math.cos(t));
      yRow.push((R + r * Math.cos(p)) * Math.sin(t));
      zRow.push(r * Math.sin(p));
    });
    lines.push({
      x: xRow,
      y: yRow,
      z: zRow,
    });
  });

  const scatterLines = lines.map((line) => ({
    type: "scatter3d",
    mode: "lines",
    x: line.x,
    y: line.y,
    z: line.z,
    line: { color: "green", width: 2 },
    showlegend: false
  }));

  return (
    <Plot
      data={scatterLines}
      layout={{
        title: "Wireframe Torus",
        scene: {
          xaxis: { title: "X" },
          yaxis: { title: "Y" },
          zaxis: { title: "Z" },
        },
      }}
    />
  );
};