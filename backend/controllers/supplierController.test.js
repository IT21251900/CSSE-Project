const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Supplier = require('../models/Supplier');
const bcrypt = require('bcrypt');
const express = require('express');

require('dotenv').config();

// Connect to test database
const url = 'mongodb://localhost:27017/test';
const connection = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Clear test database after each test
afterEach(async () => {
	await Supplier.deleteMany();
});

// Disconnect from test database
afterAll(async () => {
	await connection.close();
});

describe('Supplier Controller', () => {
	describe('POST /supplier', () => {
		it('should create a new supplier', async () => {
			const response = await request(app).post('/supplier').send({
				name: 'John Doe',
				email: 'johndoe@example.com',
				address: '123 Main St',
				phone: '555-555-5555',
				password: 'password123',
			});
			expect(response.status).toBe(201);
			expect(response.body.message).toBe('Supplier created successfully');
			const supplier = await Supplier.findOne({ email: 'johndoe@example.com' });
			expect(supplier).not.toBeNull();
			expect(supplier.name).toBe('John Doe');
			expect(supplier.address).toBe('123 Main St');
			expect(supplier.phone).toBe('555-555-5555');
			const passwordMatch = await bcrypt.compare('password123', supplier.password);
			expect(passwordMatch).toBe(true);
		});

		it('should return an error if any required fields are missing', async () => {
			const response = await request(app).post('/supplier').send({
				name: 'John Doe',
				email: 'johndoe@example.com',
				address: '123 Main St',
				phone: '555-555-5555',
			});
			expect(response.status).toBe(400);
			expect(response.body.error).toBe('All fields are required');
		});

		it('should return an error if email is already in use', async () => {
			const existingSupplier = new Supplier({
				name: 'Jane Doe',
				email: 'janedoe@example.com',
				address: '456 Main St',
				phone: '555-555-5555',
				password: await bcrypt.hash('password123', 10),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			await existingSupplier.save();
			const response = await request(app).post('/supplier').send({
				name: 'John Doe',
				email: 'janedoe@example.com',
				address: '123 Main St',
				phone: '555-555-5555',
				password: 'password123',
			});
			expect(response.status).toBe(400);
			expect(response.body.error).toBe('Email is already in use');
		});
	});

	describe('GET /supplier', () => {
		it('should return all suppliers', async () => {
			const supplier1 = new Supplier({
				name: 'John Doe',
				email: 'johndoe@example.com',
				address: '123 Main St',
				phone: '555-555-5555',
				password: await bcrypt.hash('password123', 10),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			const supplier2 = new Supplier({
				name: 'Jane Doe',
				email: 'janedoe@example.com',
				address: '456 Main St',
				phone: '555-555-5555',
				password: await bcrypt.hash('password123', 10),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			await supplier1.save();
			await supplier2.save();
			const response = await request(app).get('/supplier');
			expect(response.status).toBe(200);
			expect(response.body.suppliers.length).toBe(2);
			expect(response.body.suppliers[0].name).toBe('John Doe');
			expect(response.body.suppliers[1].name).toBe('Jane Doe');
		});
	});

	describe('GET /supplier/:id', () => {
		it('should return a single supplier by id', async () => {
			const supplier = new Supplier({
				name: 'John Doe',
				email: 'johndoe@example.com',
				address: '123 Main St',
				phone: '555-555-5555',
				password: await bcrypt.hash('password123', 10),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			await supplier.save();
			const response = await request(app).get(`/supplier/${supplier._id}`);
			expect(response.status).toBe(200);
			expect(response.body.supplier.name).toBe('John Doe');
			expect(response.body.supplier.email).toBe('johndoe@example.com');
			expect(response.body.supplier.address).toBe('123 Main St');
			expect(response.body.supplier.phone).toBe('555-555-5555');
		});

		it('should return an error if there is an error fetching the supplier', async () => {
			const response = await request(app).get('/supplier/invalidid');
			expect(response.status).toBe(500);
			expect(response.body.error).toBe('An error occurred while fetching the supplier');
		});
	});

	describe('PUT /supplier/:id', () => {
		it('should update a supplier', async () => {
			const supplier = new Supplier({
				name: 'John Doe',
				email: 'johndoe@example.com',
				address: '123 Main St',
				phone: '555-555-5555',
				password: await bcrypt.hash('password123', 10),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			await supplier.save();
			const response = await request(app).put(`/supplier/${supplier._id}`).send({
				name: 'Jane Doe',
				email: 'janedoe@example.com',
				address: '456 Main St',
				phone: '555-555-5555',
			});
			expect(response.status).toBe(200);
			expect(response.body.message).toBe('Supplier updated successfully');
			const updatedSupplier = await Supplier.findById(supplier._id);
			expect(updatedSupplier.name).toBe('Jane Doe');
			expect(updatedSupplier.email).toBe('janedoe@example.com');
			expect(updatedSupplier.address).toBe('456 Main St');
		});

		it('should return an error if any required fields are missing', async () => {
			const supplier = new Supplier({
				name: 'John Doe',
				email: 'johndoe@example.com',
				address: '123 Main St',
				phone: '555-555-5555',
				password: await bcrypt.hash('password123', 10),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			await supplier.save();
			const response = await request(app).put(`/supplier/${supplier._id}`).send({
				name: 'Jane Doe',
				email: 'janedoe@example.com',
				address: '456 Main St',
			});
			expect(response.status).toBe(400);
			expect(response.body.error).toBe('All fields are required');
		});

		it('should return an error if email is already in use', async () => {
			const supplier1 = new Supplier({
				name: 'John Doe',
				email: 'johndoe@example.com',
				address: '123 Main St',
				phone: '555-555-5555',
				password: await bcrypt.hash('password123', 10),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			const supplier2 = new Supplier({
				name: 'Jane Doe',
				email: 'janedoe@example.com',
				address: '456 Main St',
				phone: '555-555-5555',
				password: await bcrypt.hash('password123', 10),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			await supplier1.save();
			await supplier2.save();
			const response = await request(app).put(`/supplier/${supplier1._id}`).send({
				name: 'Jane Doe',
				email: 'janedoe@example.com',
				address: '456 Main St',
				phone: '555-555-5555',
			});
			expect(response.status).toBe(400);
			expect(response.body.error).toBe('Email is already in use');
		});
	});

	describe('DELETE /supplier/:id', () => {
		it('should delete a supplier', async () => {
			const supplier = new Supplier({
				name: 'John Doe',
				email: 'johndoe@example.com',
				address: '123 Main St',
				phone: '555-555-5555',
				password: await bcrypt.hash('password123', 10),
				createdAt: Date.now(),
				updatedAt: Date.now(),
			});
			await supplier.save();
			const response = await request(app).delete(`/supplier/${supplier._id}`);
			expect(response.status).toBe(200);
			expect(response.body.message).toBe('Supplier deleted successfully');
			const deletedSupplier = await Supplier.findById(supplier._id);
			expect(deletedSupplier).toBeNull();
		});
	});
});
