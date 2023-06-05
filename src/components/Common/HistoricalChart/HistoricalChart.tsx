import React, { useEffect, useState } from "react";
import { fetchHistoricalData } from "../../Api/DataProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Container } from "react-bootstrap";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  
const HistoricalChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>();

  const fetchHistoricalChartData = async () => {
    try {
      const historicalData = await fetchHistoricalData("EUR", "USD");

      setChartData(historicalData);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };
  useEffect(() => {
    fetchHistoricalChartData();
  }, []);

  return (
    <>

      <Container className="p-5">
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top" as const,
                },
                title: {
                  display: true,
                  text: "Chart.js Line Chart",
                },
              },
            }}
          />
        ) : (
          <div>Loading chart data...</div>
        )}
      </Container>
    </>
  );
};

export default HistoricalChart;
