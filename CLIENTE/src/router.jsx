import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Form from './componentes/Form/Form.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path:'formulario',
    element:<Form/>
  }

]);

export default function Router() {
  return <RouterProvider router={router} />;
}