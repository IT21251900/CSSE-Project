import { lazy } from 'react';

const CreateSupplier = lazy(() => import('../pages/supplier/CreateSupplier'));
const AllSupplier = lazy(() => import('../pages/supplier/AllSupplier'));

const coreRoutes = [
  {
    path: '/supplier/create',
    title: 'Create Supplier',
    component: CreateSupplier,
  },

  {
    path: '/supplier/all',
    title: 'All Suppliers',
    component: AllSupplier,
  },
];

const routes = [...coreRoutes];
export default routes;
