import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Breadcrumb from '../../components/Breadcrumb';
import { useLocation } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  requestOrderID: Yup.string(),
  orderID: Yup.string().required('Order ID is required'),
  supplierID: Yup.string(),
  comments: Yup.string(),
  procurementOfficerID: Yup.string().required(
    'Procurement Officer ID is required',
  ),
  progress: Yup.string().required('Progress is required'),
});

export type RequestOrderType = {
  requestOrderID: string;
  orderID: string;
  supplierID: string;
  comments: string;
  procurementOfficerID: string;
  progress: string;
};

const CreateRequestOrder = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/'); // Split the URL path into segments

  // Find the 'orderID' from the path segments
  const orderIDFromURL = pathSegments[pathSegments.length - 1];

  const [error, setError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      requestOrderID: '',
      orderID: orderIDFromURL,
      supplierID: '',
      comments: '',
      procurementOfficerID: '652a281a1ca860ab1258cbe5',
      progress: 'pending', // Set a default progress value here
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: RequestOrderType) => {
    try {
      const response = await axios.post('/api/request-orders', values); // Adjust the API endpoint
      if (response.status !== 201) {
        setError(response.data.error);
      } else {
        setError(null);
        formik.resetForm();
        toast.success('Request Order created successfully');
      }
    } catch (error: any) {
      setError(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierID, setSelectedSupplierID] = useState('');

  useEffect(() => {
    const getSuppliers = async () => {
      try {
        const response = await axios.get('/api/supplier');
        const data = await response.data;
        if (response.status !== 200) {
          const error: string = data.error; // Add type annotation to error variable
          setError(error);
        } else {
          setError(null);
          setSuppliers(data.suppliers);
        }
      } catch (error: any) {
        // Add type annotation to error parameter
        setError(error.response.data.error);
      }
    };
    getSuppliers();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Create Request Order" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- create Request Order Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Request Order Form
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>

                {/* <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Order ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Order ID"
                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary ${
                      formik.touched.orderID && formik.errors.orderID
                        ? 'border-danger'
                        : 'border-stroke'
                    }`}
                    id="orderID"
                    name="orderID"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.orderID}
                  />
                  {formik.touched.orderID && formik.errors.orderID ? (
                    <div className="text-danger">{formik.errors.orderID}</div>
                  ) : null}
                </div> */}

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Order ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Order ID"
                    readOnly={true}
                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary ${
                      formik.touched.orderID && formik.errors.orderID
                        ? 'border-danger'
                        : 'border-stroke'
                    }`}
                    id="orderID"
                    name="orderID"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.orderID}
                  />
                  {formik.touched.orderID && formik.errors.orderID ? (
                    <div className="text-danger">{formik.errors.orderID}</div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Approvel Status
                  </label>
                  <select
                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary ${
                      formik.touched.progress && formik.errors.progress
                        ? 'border-danger'
                        : 'border-stroke'
                    }`}
                    id="progress"
                    name="progress"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.progress}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    {/* <option value="assigned">Assigned</option>
                    <option value="sent">Sent</option>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="inprogress">In Progress</option>
                    <option value="delivered">Delivered</option>
                    <option value="payed">Payed</option> */}
                  </select>
                  {formik.touched.progress && formik.errors.progress ? (
                    <div className="text-danger">{formik.errors.progress}</div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Supplier
                  </label>
                  <select
                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary ${
                      formik.touched.supplierID && formik.errors.supplierID
                        ? 'border-danger'
                        : 'border-stroke'
                    }`}
                    id="supplierID"
                    name="supplierID"
                    onChange={(e) => {
                      const selectedID = e.target.value;
                      setSelectedSupplierID(selectedID);
                      formik.setFieldValue('supplierID', selectedID); // Set the formik field value
                    }}
                    onBlur={formik.handleBlur}
                    value={selectedSupplierID}
                    disabled={formik.values.progress === 'rejected' || formik.values.progress === 'pending'} // Disable if progress is 'rejected'
                  >
                    <option value="">Select a Supplier</option>
                    {suppliers.map(
                      (supplier: { _id: string; name: string }) => (
                        <option key={supplier._id} value={supplier._id}>
                          {supplier.name}
                        </option>
                      ),
                    )}
                    <div className="text-danger">
                      {formik.errors.supplierID}
                    </div>
                  </select>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Comments
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Comments"
                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary ${
                      formik.touched.comments && formik.errors.comments
                        ? 'border-danger'
                        : 'border-stroke'
                    }`}
                    id="comments"
                    name="comments"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.comments}
                  />
                  {formik.touched.comments && formik.errors.comments ? (
                    <div className="text-danger">{formik.errors.comments}</div>
                  ) : null}
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Procurement Officer ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Procurement Officer ID"
                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none transition focus-border-primary active-border-primary ${
                      formik.touched.procurementOfficerID &&
                      formik.errors.procurementOfficerID
                        ? 'border-danger'
                        : 'border-stroke'
                    }`}
                    id="procurementOfficerID"
                    name="procurementOfficerID"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.procurementOfficerID}
                    readOnly={true}
                  />
                  {formik.touched.procurementOfficerID &&
                  formik.errors.procurementOfficerID ? (
                    <div className="text-danger">
                      {formik.errors.procurementOfficerID}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Approve Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRequestOrder;
