import Breadcrumb from '../../components/Breadcrumb';
import RequestsTable from '../../components/RequestsTable';

const AllSupplier = () => {
  return (
    <>
      <Breadcrumb pageName="All Requests" />

      <div className="flex flex-col gap-10">
        <RequestsTable />
      </div>
    </>
  );
};

export default AllSupplier;
