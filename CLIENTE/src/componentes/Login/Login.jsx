// File: Login.jsx
import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ onLogin } = {}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validate = () => {
    if (!email) return 'El email es requerido.';
    // simple email check
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!re.test(email)) return 'Ingresa un email válido.';
    if (!password) return 'La contraseña es requerida.';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      // Simula llamada a API. Reemplazá con tu llamada real.
      await new Promise((res) => setTimeout(res, 1400));

      // Si querés, enviá los datos al callback del padre
      if (typeof onLogin === 'function') {
        onLogin({ email, remember });
      }

      // Aquí podrías redirigir o mostrar éxito — lo dejamos manejable por el prop onLogin
    } catch (err) {
      setError('No se pudo iniciar sesión. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.brand}>
          <div className={styles.logo} aria-hidden><img src='./escudo.png'/></div>
          <h1 className={styles.title}>Iniciar sesión</h1>
          <p className={styles.subtitle}>Accedé a tu cuenta de forma segura</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <label className={styles.field}>
          <span className={styles.labelText}>Email</span>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            aria-label="Email"
            required
          />
        </label>

        <label className={styles.field}>
          <span className={styles.labelText}>Contraseña</span>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            aria-label="Contraseña"
            required
          />
        </label>


        <button
          className={styles.primaryButton}
          type="submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <span className={styles.spinner} aria-hidden></span>
              <span className={styles.btnText}>Ingresando...</span>
            </>
          ) : (
            <span className={styles.btnText}>Enviar</span>
          )}
        </button>


   
      </form>
    </div>
  );
}

