import Breadcrumb from '../../components/Breadcrumb';
import SupplierTable from '../../components/SupplierTable';

const AllSupplier = () => {
  return (
    <>
      <Breadcrumb pageName="All Supplier" />

      <div className="flex flex-col gap-10">
        <SupplierTable />
      </div>
    </>
  );
};

export default AllSupplier;
