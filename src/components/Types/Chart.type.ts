export interface chart {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };

  
export interface HistoricalChartProps {
    base: string;
    symbols: string;
  }