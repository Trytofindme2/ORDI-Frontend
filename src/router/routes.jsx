import { createBrowserRouter } from 'react-router-dom';
import adminRoutes from './adminRoutes'; 
import userRoutes from './userRoutes';

const routes = createBrowserRouter([
  ...adminRoutes,
  ...userRoutes
]);

export default routes;
