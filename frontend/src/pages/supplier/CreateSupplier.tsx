import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumb';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone must be a number')
    .required('Phone is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
});

type FormValues = {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

const CreateSupplier = () => {
  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post('/api/supplier/create', values);
      console.log(response);
      if (response.status !== 201) {
        setError(response.data.error);
      } else {
        setError(null);
        formik.resetForm();
        console.log('Supplier created:', response.data.message);
      }
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Supplier" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- create supplier Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Supplier Form
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
                    <div className="text-danger">{formik.errors.name}</div>
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
                    <div className="text-danger">{formik.errors.email}</div>
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
                    <div className="text-danger">{formik.errors.address}</div>
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
                    <div className="text-danger">{formik.errors.phone}</div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500'
                        : ''
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

                <div className="mb-5.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Re-type Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Create Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSupplier;
