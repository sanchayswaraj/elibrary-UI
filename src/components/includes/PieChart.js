import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const data = {
      labels: ["Sci-Fi", "Novels", "Technical", "History", "Others"],
      datasets: [
        {
          data: [15, 25, 10, 20, 15, 15],
          backgroundColor: [
            "#FF5733",
            "#FFC300",
            "#DAF7A6",
            "#FF5733",
            "#FFC300",
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false, // Disable aspect ratio to control size
      plugins: {
        legend: {
          labels: {
            fontSize: 12, // Reduce legend label font size
          },
        },
      },
    };

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Adjust the canvas dimensions (e.g., 150x150)
    chartRef.current.width = 250;
    chartRef.current.height = 250;

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="pie-chart">
      {/* Canvas element with explicit width and height */}
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default PieChart;
