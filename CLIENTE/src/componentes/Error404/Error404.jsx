import { useRouteError } from "react-router-dom";
import styles from './Error404.module.css'

export default function Error404() {
  const error = useRouteError();
  console.error(error);

  return (
   <div className={styles.container}>
    <div className={styles.box}>
    <h1> 404</h1>
    <h2>
        Oops!
    </h2>
    <p>
        Lo siento, ha ocurrido un error inesperado
    </p>
    <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
   </div>
  );
}