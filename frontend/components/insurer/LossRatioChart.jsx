"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

/**
 * LossRatioChart — Recharts-based bar chart for pool health trends.
 * High-fidelity, consistent with Material 3 tokens.
 */
export default function LossRatioChart({ data }) {
  const chartData = data || [
    { label: "Jan", ratio: 12, target: 15 },
    { label: "Feb", ratio: 18, target: 15 },
    { label: "Mar", ratio: 14, target: 15 },
    { label: "Apr", ratio: 22, target: 15 },
    { label: "May", ratio: 11, target: 15 },
    { label: "Jun", ratio: 9,  target: 15 },
  ];

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--outline-variant) / 0.2)" />
          <XAxis 
            dataKey="label" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "hsl(var(--outline))", fontSize: 10, fontWeight: 700 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "hsl(var(--outline))", fontSize: 10, fontWeight: 700 }}
          />
          <Tooltip 
            cursor={{ fill: "hsl(var(--surface-container))" }}
            contentStyle={{ 
              backgroundColor: "hsl(var(--surface-container-highest))", 
              border: "1px solid hsl(var(--outline-variant))",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "hsl(var(--on-surface))"
            }}
          />
          <ReferenceLine y={15} stroke="hsl(var(--error))" strokeDasharray="3 3" label={{ position: 'right', value: 'Target', fill: 'hsl(var(--error))', fontSize: 10, fontWeight: 'bold' }} />
          <Bar 
            dataKey="ratio" 
            radius={[4, 4, 0, 0]}
            fill="hsl(var(--primary-container))"
          >
            {chartData.map((entry, index) => (
              <rect
                key={`cell-${index}`}
                fill={entry.ratio > entry.target ? "hsl(var(--error))" : "hsl(var(--primary-container))"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
