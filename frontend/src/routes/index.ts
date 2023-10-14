import { lazy } from 'react';

const CreateSupplier = lazy(() => import('../pages/supplier/CreateSupplier'));
const AllSupplier = lazy(() => import('../pages/supplier/AllSupplier'));
const EditSupplier = lazy(() => import('../pages/supplier/EditSupplier'));
const CreateProcurementOfficer = lazy(() => import('../pages/procument/CreateProcumentOfficer'));
const AllProcurementOfficers = lazy(() => import('../pages/procument/AllProcumentOfficers'));
const CreateRequestOrder = lazy(() => import('../pages/requests/CreateRequestOrder'));
const AllRequestOrders = lazy(() => import('../pages/requests/AllRequests'));
const AllOrders = lazy(() => import('../pages/requests/AllOrders'));

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
  {
    path: '/procurement-officer/create',
    title: 'Create Procurement Officer',
    component: CreateProcurementOfficer,
  },

  {
    path: '/procurement-officer/all',
    title: 'All Procurement Officers',
    component: AllProcurementOfficers,
  },

  {
    path: '/requestOrder/create/:id',
    title: 'Create Request Order',
    component: CreateRequestOrder,
  },

  {
    path: '/requests/',
    title: 'AllRequestOrders',
    component: AllRequestOrders,
  },

  {
    path: '/Orders/',
    title: 'AllOrders',
    component: AllOrders,
  },


];


const routes = [...coreRoutes];
export default routes;
