// File: Login.jsx
import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validate = () => {
    if (!email) return 'El email es requerido.';
    const re = /^[^@\s]+@[^@\s]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Ingresa un email válido.';
    if (!password) return 'La contraseña es requerida.';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Muestra el error del servidor si lo hay
        return setError(data.message || 'Error al iniciar sesión.');
      }

      // Guardar token y datos del usuario en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirigir a la ruta protegida
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      setError('No se pudo iniciar sesión. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.brand}>
          <div className={styles.logo} aria-hidden>
            <img src='./escudo.png' />
          </div>
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
