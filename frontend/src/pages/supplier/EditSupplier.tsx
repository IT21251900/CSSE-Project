import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you're using react-router for routing
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumb';
import { SupplierType } from './CreateSupplier';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone must be a number')
    .min(10, 'Phone must be at least 10 digits')
    .required('Phone is required'),
});

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [supplier, setSupplier] = useState<SupplierType | null>(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`/api/supplier/${id}`);
        setSupplier(response.data.supplier);
      } catch (error) {
        console.error('Error fetching supplier:', error);
      }
    };

    fetchSupplier();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: supplier?.name ?? '',
      email: supplier?.email ?? '',
      address: supplier?.address ?? '',
      phone: supplier?.phone ?? '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: SupplierType) => {
    try {
      const response = await axios.put(`/api/supplier/${id}`, values);
      if (response.status !== 200) {
        setError(response.data.error);
      } else {
        setError(null);
        formik.resetForm();
        navigate('/supplier/all');
      }
    } catch (error: any) {
      console.error('Error updating supplier:', error);
      setError(error.response.data.error);
    }
  };

  if (!supplier) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumb pageName="Edit Supplier" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- create supplier Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Edit Supplier Form
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${
                      formik.touched.name && formik.errors.name
                        ? 'border-red-500'
                        : ''
                    }`}
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">
                      {formik.errors.name.toString()}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : ''
                    }`}
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">
                      {formik.errors.email.toString()}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${
                      formik.touched.address && formik.errors.address
                        ? 'border-red-500'
                        : ''
                    }`}
                    id="address"
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="text-danger">
                      {formik.errors.address.toString()}
                    </div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Phone
                  </label>
                  <input
                    placeholder="Enter Phone Number"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${
                      formik.touched.phone && formik.errors.phone
                        ? 'border-red-500'
                        : ''
                    }`}
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="text-danger">
                      {formik.errors.phone.toString()}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Update Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSupplier;
