import * as React from "react";
import Paper from "@mui/material/Paper";
import { scaleBand } from "@devexpress/dx-chart-core";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Animation,
  ArgumentScale,
  EventTracker,
} from "@devexpress/dx-react-chart";
import dayjs from "dayjs";

export default function TransactionChart({ data }) {
  const chartData = data.map((item) => {
    item.month = dayjs()
      .month(item._id - 1)
      .format("MMMM");
    return item;
  });

  return (
    <Paper>
      <Chart data={chartData} sx={{ marginTop: 4 }}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          valueField="totalExpenses"
          argumentField="month"
          color="green"
        />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
}
