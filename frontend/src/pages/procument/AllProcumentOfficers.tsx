import Breadcrumb from '../../components/Breadcrumb';
import ProcurementOfficerTable from '../../components/ProcurementOfficerTable';

const AllProcurementOfficers = () => {
  return (
    <>
      <Breadcrumb pageName="All Procurement Officers" />

      <div className="flex flex-col gap-10">
        <ProcurementOfficerTable />
      </div>
    </>
  );
};

export default AllProcurementOfficers;

