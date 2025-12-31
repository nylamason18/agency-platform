"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import type { KpiPoint } from "@/lib/data/kpi";

type Props = { data: KpiPoint[] };

function groupByDate(data: KpiPoint[]) {
  const map = new Map<string, any>();
  for (const row of data) {
    if (!map.has(row.date)) map.set(row.date, { date: row.date });
    const obj = map.get(row.date);
    obj[`${row.channel}_spend`] = row.spend;
    obj[`${row.channel}_revenue`] = row.revenue;
  }
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export default function KpiChart({ data }: Props) {
  const chartData = groupByDate(data);

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="google_ads_spend" name="Google Ads Spend" dot={false} />
          <Line type="monotone" dataKey="meta_ads_spend" name="Meta Ads Spend" dot={false} />
          <Line type="monotone" dataKey="google_ads_revenue" name="Google Ads Revenue" dot={false} />
          <Line type="monotone" dataKey="meta_ads_revenue" name="Meta Ads Revenue" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
