const express = require("express");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("../router/Customer");
const request = require("supertest");
const Customer = require('../model/Customer');
const dotenv = require("dotenv");

dotenv.config();

let app;
let server;
let mongod;

const prepareCustomer = async (customerId) => {
  const newCustomer = {
    customerId,
    name: "Aman from thepast",
    idNo: "3374023103910901",
    address: "Jl Abdulrahman Saleh No 20, Pontianak",
  };

  await Customer.create(newCustomer);
  return newCustomer;
};

describe("Customer App End to End", () => {
  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoUri = mongod.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(bodyParser.json());
    app.use("/", router);
    server = app.listen();
  });

  afterAll(() => {
    mongoose.connection.close();
    mongod.stop();
    server.close();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("Get Customer", () => {
    it("When get Customer with customerId = 7, successfully return customer information", async () => {
      const customerId = "7";
      const createdCustomer = await prepareCustomer(customerId);

      const rsponse = await request(app).get(`/customers/${customerId}`);

      expect(rsponse).not.toBeNull();

      expect(rsponse.status).toBe(200);
      expect(rsponse.body).not.toBeNull();

      const customer = rsponse.body;

      expect(customer.customerId).toBe(customerId);
      expect(customer.name).toBe(createdCustomer.name);
    });
  });
});
