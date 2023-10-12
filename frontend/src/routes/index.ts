import { lazy } from 'react';

const CreateSupplier = lazy(() => import('../pages/supplier/CreateSupplier'));
const AllSupplier = lazy(() => import('../pages/supplier/AllSupplier'));
const EditSupplier = lazy(() => import('../pages/supplier/EditSupplier'));

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
  {
    path: '/supplier/edit/:id',
    title: 'Edit Supplier',
    component: EditSupplier,
  },
];

const routes = [...coreRoutes];
export default routes;
