import React, { useEffect, useState } from "react";
import { fetchHistoricalData } from "../../Api/DataProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Container } from "react-bootstrap";
import { HistoricalChartProps } from "../../Types/Chart.type";
import { chart } from "../../Types/Chart.type";


ChartJS.register( CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

  
const HistoricalChart: React.FC<HistoricalChartProps> = ({
    base,symbols
}) => {
  const [chartData, setChartData] = useState<chart>();

  const fetchHistoricalChartData = async () => {
    try {
      const historicalData = await fetchHistoricalData(base,symbols);

      setChartData(historicalData);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };
  useEffect(() => {
    fetchHistoricalChartData();
  }, [base,symbols]);

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
                  text: `${base} to ${symbols} last year monthly Chart`,
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
