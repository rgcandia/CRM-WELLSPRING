import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import styles from "./Charts.module.css"; // Asegurate de tener este CSS

export default function NivelChart() {
  const formularios = useSelector((state) => state.data.formularios || []);

  const data = useMemo(() => {
    let conteo = { INICIAL: 0, PRIMARIA: 0, SECUNDARIA: 0 };

    formularios.forEach((form) => {
      const postulantes = form.data?.postulantes || [];
      postulantes.forEach((p) => {
        const nivel = p.nivel?.toUpperCase();
        if (nivel && conteo[nivel] !== undefined) conteo[nivel]++;
      });
    });

    return [
      { name: "Inicial", cantidad: conteo.INICIAL },
      { name: "Primaria", cantidad: conteo.PRIMARIA },
      { name: "Secundaria", cantidad: conteo.SECUNDARIA },
    ];
  }, [formularios]);

  const COLORS = ["#4a90e2", "#2ecc71", "#9b59b6"]; // azul, verde, morado

  return (
    <div className={styles.chartWrapper}>
      <h3 className={styles.chartTitle}>Postulaciones por Nivel</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e3e7ef" />
          <XAxis dataKey="name" tick={{ fill: "#142454" }} />
          <YAxis allowDecimals={false} tick={{ fill: "#142454" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="cantidad" radius={[6, 6, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

