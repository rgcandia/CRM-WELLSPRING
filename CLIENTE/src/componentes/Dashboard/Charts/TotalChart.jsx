import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./Charts.module.css";

const COLORS = ["#142454", "#c8d1e0"]; // Azul oscuro (leídos), gris claro (sin leer)

export default function TotalChart({ leidos, sinLeer }) {
  const data = [
    { name: "Leídos", value: leidos },
    { name: "Sin leer", value: sinLeer },
  ];

  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={85}
            innerRadius={50}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
