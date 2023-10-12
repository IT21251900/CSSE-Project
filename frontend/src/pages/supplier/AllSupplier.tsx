import Breadcrumb from '../../components/Breadcrumb';
import TableThree from '../../components/SupplierTable';

const AllSupplier = () => {
  return (
    <>
      <Breadcrumb pageName="All Supplier" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default AllSupplier;
