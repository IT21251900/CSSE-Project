const request = require('supertest');
const app = require('../index'); // Import your Express app
const mongoose = require('mongoose');
const RequestOrder = require('../models/RequestOrder');
const { expect } = require('chai');

// Create a test database connection
const url = 'mongodb://localhost:27017/test';
const connection = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Clear test database after each test
afterEach(async () => {
  await RequestOrder.deleteMany();
});

// Disconnect from the test database
afterAll(async () => {
  await connection.close();
});

describe('RequestOrder Controller', () => {
  describe('POST /request-order', () => {
    it('should create a new request order', async () => {
      const response = await request(app)
        .post('/request-order')
        .send({
          requestOrderID: 'RO123',
          orderID: 'Order123',
          supplierID: 'Supplier123',
          comments: 'Sample comments',
          procurementOfficerID: 'PO123',
          progress: 0,
        });

      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Request Order created successfully');
    });

    it('should return an error if any required fields are missing', async () => {
      const response = await request(app)
        .post('/request-order')
        .send({
          // Missing required fields
        });

      expect(response.status).to.equal(500); // Assuming you set up this status code for internal server errors
      expect(response.body.error).to.equal('An error occurred while creating the Request Order');
    });
  });

  describe('GET /request-order', () => {
    it('should return all request orders', async () => {
      const requestOrder1 = new RequestOrder({
        requestOrderID: 'RO1',
        orderID: 'Order1',
        supplierID: 'Supplier1',
        comments: 'Comments 1',
        procurementOfficerID: 'PO1',
        progress: 0,
      });
      const requestOrder2 = new RequestOrder({
        requestOrderID: 'RO2',
        orderID: 'Order2',
        supplierID: 'Supplier2',
        comments: 'Comments 2',
        procurementOfficerID: 'PO2',
        progress: 1,
      });

      await requestOrder1.save();
      await requestOrder2.save();

      const response = await request(app).get('/request-order');

      expect(response.status).to.equal(200);
      expect(response.body.requestOrders).to.be.an('array');
      expect(response.body.requestOrders).to.have.lengthOf(2);
      expect(response.body.requestOrders[0].requestOrderID).to.equal('RO1');
      expect(response.body.requestOrders[1].requestOrderID).to.equal('RO2');
    });
  });

  describe('GET /request-order/:id', () => {
    it('should return a single request order by id', async () => {
      const requestOrder = new RequestOrder({
        requestOrderID: 'RO123',
        orderID: 'Order123',
        supplierID: 'Supplier123',
        comments: 'Sample comments',
        procurementOfficerID: 'PO123',
        progress: 0,
      });

      await requestOrder.save();

      const response = await request(app).get(`/request-order/${requestOrder._id}`);

      expect(response.status).to.equal(200);
      expect(response.body.requestOrder.requestOrderID).to.equal('RO123');
    });

    it('should return an error if the request order does not exist', async () => {
      const nonExistentId = '60ab0f4e28dd0c002b204c10'; // A non-existent MongoDB ObjectId

      const response = await request(app).get(`/request-order/${nonExistentId}`);

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('Request Order not found');
    });
  });

  describe('PUT /request-order/:id', () => {
    it('should update a request order', async () => {
      const requestOrder = new RequestOrder({
        requestOrderID: 'RO123',
        orderID: 'Order123',
        supplierID: 'Supplier123',
        comments: 'Sample comments',
        procurementOfficerID: 'PO123',
        progress: 0,
      });

      await requestOrder.save();

      const updatedData = {
        requestOrderID: 'UpdatedRO',
        orderID: 'UpdatedOrder',
        supplierID: 'UpdatedSupplier',
        comments: 'Updated comments',
        procurementOfficerID: 'UpdatedPO',
        progress: 1,
      };

      const response = await request(app)
        .put(`/request-order/${requestOrder._id}`)
        .send(updatedData);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Request Order updated successfully');

      // Fetch the updated request order from the database and check if the data matches
      const updatedRequestOrder = await RequestOrder.findById(requestOrder._id);
      expect(updatedRequestOrder.requestOrderID).to.equal('UpdatedRO');
      expect(updatedRequestOrder.orderID).to.equal('UpdatedOrder');
      expect(updatedRequestOrder.supplierID).to.equal('UpdatedSupplier');
      expect(updatedRequestOrder.comments).to.equal('Updated comments');
      expect(updatedRequestOrder.procurementOfficerID).to.equal('UpdatedPO');
      expect(updatedRequestOrder.progress).to.equal(1);
    });

    it('should return an error if the request order does not exist', async () => {
      const nonExistentId = '60ab0f4e28dd0c002b204c10'; // A non-existent MongoDB ObjectId
      const updatedData = {
        requestOrderID: 'UpdatedRO',
        orderID: 'UpdatedOrder',
        supplierID: 'UpdatedSupplier',
        comments: 'Updated comments',
        procurementOfficerID: 'UpdatedPO',
        progress: 1,
      };

      const response = await request(app)
        .put(`/request-order/${nonExistentId}`)
        .send(updatedData);

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('Request Order not found');
    });

    it('should return an error if any required fields are missing', async () => {
      const requestOrder = new RequestOrder({
        requestOrderID: 'RO123',
        orderID: 'Order123',
        supplierID: 'Supplier123',
        comments: 'Sample comments',
        procurementOfficerID: 'PO123',
        progress: 0,
      });

      await requestOrder.save();

      const response = await request(app)
        .put(`/request-order/${requestOrder._id}`)
        .send({
          // Missing required fields
        });

      expect(response.status).to.equal(500); // Assuming you set up this status code for internal server errors
      expect(response.body.error).to.equal('An error occurred while updating the Request Order');
    });
  });

  describe('DELETE /request-order/:id', () => {
    it('should delete a request order', async () => {
      const requestOrder = new RequestOrder({
        requestOrderID: 'RO123',
        orderID: 'Order123',
        supplierID: 'Supplier123',
        comments: 'Sample comments',
        procurementOfficerID: 'PO123',
        progress: 0,
      });

      await requestOrder.save();

      const response = await request(app).delete(`/request-order/${requestOrder._id}`);

      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal('Request Order deleted successfully');

      // Attempt to fetch the deleted request order and ensure it no longer exists
      const deletedRequestOrder = await RequestOrder.findById(requestOrder._id);
      expect(deletedRequestOrder).to.be.null;
    });

    it('should return an error if the request order does not exist', async () => {
      const nonExistentId = '60ab0f4e28dd0c002b204c10'; // A non-existent MongoDB ObjectId

      const response = await request(app).delete(`/request-order/${nonExistentId}`);

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal('Request Order not found');
    });
  });
});
