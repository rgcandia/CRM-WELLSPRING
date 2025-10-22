import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Router from './router.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store.js';
import { Provider } from 'react-redux'; // Importa el Provider de react-redux
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
      {/* ToastContainer se agrega aquí una sola vez */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </Provider>
  </StrictMode>,
);
