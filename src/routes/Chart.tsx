import { useQuery } from "@tanstack/react-query";
import { fetchOhlcvHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IOhlcv {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId, isDark }: { coinId: string; isDark: boolean }) {
  const { isPending, data } = useQuery<IOhlcv[]>({
    queryKey: ["ohlcvHistory", coinId],
    queryFn: () => fetchOhlcvHistory(coinId),
  });

  return (
    <div>
      {isPending ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((ohlcv) => {
                  const date = new Date(ohlcv.time_open * 1000);
                  const month = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const day = date.getDate().toString().padStart(2, "0");
                  return {
                    x: `${month}-${day}`,
                    y: [ohlcv.open, ohlcv.high, ohlcv.low, ohlcv.close],
                  };
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
