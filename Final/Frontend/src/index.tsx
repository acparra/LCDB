import ReactDOM from 'react-dom/client';
import { AppRouter } from './routes/AppRouter';
import './index.sass'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Aqui se renderiza el componente principal que en este caso es un enrutador que nos permite tener rutas publicas y privadas.

root.render(
  <div className='container-fluid p-0 m-0'>
    <AppRouter></AppRouter>
  </div>
);