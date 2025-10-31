import { useSelector } from "react-redux";
import { useMemo } from "react";
import styles from "./Dashboard.module.css";
import TotalChart from "./Charts/TotalChart"; // 👈 Nuevo componente

export default function Dashboard() {
  const formularios = useSelector((state) => state.data.formularios || []);

  const stats = useMemo(() => {
    const total = formularios.length;

    const leidos = formularios.filter((f) => f.read === true).length;
    const sinLeer = total - leidos;

    return { total, leidos, sinLeer };
  }, [formularios]);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Panel General</h1>

      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <h2>Total Formularios</h2>
          <p className={styles.statNumber}>{stats.total}</p>
          <TotalChart leidos={stats.leidos} sinLeer={stats.sinLeer} />
        </div>
      </div>
    </div>
  );
}
