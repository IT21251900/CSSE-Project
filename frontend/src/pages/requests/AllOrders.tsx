import Breadcrumb from '../../components/Breadcrumb';
import OrdersTable from '../../components/OrdersTable';

const AllSupplier = () => {
  return (
    <>
      <Breadcrumb pageName="All Accepted Orders" />

      <div className="flex flex-col gap-10">
        <OrdersTable />
      </div>
    </>
  );
};

export default AllSupplier;
