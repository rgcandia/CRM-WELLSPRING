import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Form from './componentes/Form/Form.jsx';
import Error404 from './componentes/Error404/Error404.jsx';
import Login from './componentes/Login/Login.jsx'; // <-- importa tu login
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute.jsx'; // <-- protege las rutas

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <Error404 />, },
  {
    path: '/formulario',
    element: (
        <Form />
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
