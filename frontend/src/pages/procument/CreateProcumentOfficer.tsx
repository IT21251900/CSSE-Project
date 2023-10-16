import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumb';

const validationSchema = Yup.object().shape({
  procumentOfficerID: Yup.string().required('ID is required'),
  procumentOfficerName: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export type ProcurementOfficerType = {
  procumentOfficerID: string;
  procumentOfficerName: string;
  password: string;
  confirmPassword: string;
};

const AddProcurementOfficer = () => {
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      procumentOfficerID: '',
      procumentOfficerName: '',
      password: '',
      confirmPassword: '',
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
    } catch (error) { 
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Procurement Officer" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- create supplier Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Procurement Officer Form
              </h3>
            </div>
            <form className="p-6.5" onSubmit={formik.handleSubmit}>
              <div>{error && <div style={{ color: 'red' }}>{error}</div>}</div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  ID
                </label>
                <input
                  type="text"
                  placeholder="Enter ID"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${
                    formik.touched.procumentOfficerID &&
                    formik.errors.procumentOfficerID
                      ? 'border-danger'
                      : 'border-stroke'
                  }`}
                  id="procumentOfficerID"
                  name="procumentOfficerID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.procumentOfficerID}
                />
                {formik.touched.procumentOfficerID &&
                formik.errors.procumentOfficerID ? (
                  <div className="text-danger">
                    {formik.errors.procumentOfficerID}
                  </div>
                ) : null}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus.border-primary active.border-primary ${
                    formik.touched.procumentOfficerName &&
                    formik.errors.procumentOfficerName
                      ? 'border-danger'
                      : 'border-stroke'
                  }`}
                  id="procumentOfficerName"
                  name="procumentOfficerName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.procumentOfficerName}
                />
                {formik.touched.procumentOfficerName &&
                formik.errors.procumentOfficerName ? (
                  <div className="text-danger">
                    {formik.errors.procumentOfficerName}
                  </div>
                ) : null}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus.border-primary active.border-primary ${
                    formik.touched.password && formik.errors.password
                      ? 'border-danger'
                      : 'border-stroke'
                  }`}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus.border-primary active.border-primary ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? 'border-danger'
                      : 'border-stroke'
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-danger">
                    {formik.errors.confirmPassword}
                  </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProcurementOfficer;
