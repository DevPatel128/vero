"use client";

import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

interface SpendChartProps {
  data: { month: string; income: number; spend: number }[];
}

export function SpendChart({ data }: SpendChartProps) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A96E" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#C9A96E" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="inkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#111111" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#111111" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E5E0D8" strokeDasharray="2 4" />
          <XAxis dataKey="month" tick={{ fill: "#595959", fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: "#595959", fontSize: 11 }} tickLine={false} axisLine={false} width={48} />
          <Tooltip
            contentStyle={{ background: "#111", color: "#FAF7F2", border: "none", borderRadius: 4, fontSize: 12 }}
            labelStyle={{ color: "#C9A96E" }}
            formatter={(v: number) => `$${v.toLocaleString()}`}
          />
          <Area type="monotone" dataKey="income" stroke="#C9A96E" strokeWidth={1.5} fill="url(#goldFill)" />
          <Area type="monotone" dataKey="spend" stroke="#111111" strokeWidth={1.5} fill="url(#inkFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
