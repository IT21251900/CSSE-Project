import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  procumentOfficerID: Yup.string().required('ID is required'),
  procumentOfficerName: Yup.string().required('Name is required'),
});

export type ProcurementOfficerType = {
  procumentOfficerID: String,
  procumentOfficerName: String,
};

const AddProcurementOfficer = () => {
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      procumentOfficerID: '',
      procumentOfficerName: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: ProcurementOfficerType) => {
    try {
      const response = await axios.post('/api/procurement-officer', values);
      if (response.status !== 201) {
        setError(response.data.error);
      } else {
        setError(null);
        formik.resetForm();
        toast.success('Procurement Officer created successfully');
      }
    } catch (error: any) {
      setError(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">ID</label>
          <input
            type="text"
            placeholder="Enter ID"
            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${
              formik.touched.procumentOfficerID && formik.errors.procumentOfficerID
                ? 'border-danger'
                : 'border-stroke'
            }`}
            id="procumentOfficerID"
            name="procumentOfficerID"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.procumentOfficerID}
          />
          {formik.touched.procumentOfficerID && formik.errors.procumentOfficerID ? (
            <div className="text-danger">{formik.errors.procumentOfficerID}</div>
          ) : null}
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus.border-primary active.border-primary ${
              formik.touched.procumentOfficerName && formik.errors.procumentOfficerName
                ? 'border-danger'
                : 'border-stroke'
            }`}
            id="procumentOfficerName"
            name="procumentOfficerName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.procumentOfficerName}
          />
          {formik.touched.procumentOfficerName && formik.errors.procumentOfficerName ? (
            <div className="text-danger">{formik.errors.procumentOfficerName}</div>
          ) : null}
        </div>

        {/* Add fields for other attributes as needed */}
        
        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
        >
          Create Procurement Officer
        </button>
      </form>
    </>
  );
};

export default AddProcurementOfficer;
