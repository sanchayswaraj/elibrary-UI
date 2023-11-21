import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChart({ ebookCategoryData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Modify data based on your ebookCategoryData
    const data = {
      labels: Object.keys(ebookCategoryData),
      datasets: [
        {
          data: Object.values(ebookCategoryData),
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 205, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            // Add more colors if needed
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            fontSize: 12,
          },
        },
      },
    };

    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

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
  }, [ebookCategoryData]); // Add ebookCategoryData as a dependency

  return (
    <div className="pie-chart">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default PieChart;
