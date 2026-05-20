"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { categoryColor } from "@/lib/categories";

interface CategoryDonutProps {
  data: { category: string; value: number }[];
}

export function CategoryDonut({ data }: CategoryDonutProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="category" innerRadius={70} outerRadius={100} strokeWidth={1}>
            {data.map((d) => (<Cell key={d.category} fill={categoryColor(d.category)} stroke="#FAF7F2" />))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#111", color: "#FAF7F2", border: "none", borderRadius: 4, fontSize: 12 }}
            formatter={(v: number) => `$${v.toLocaleString()}`}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} iconType="square" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
