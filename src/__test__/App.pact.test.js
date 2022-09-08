const express = require("express");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("../router/Customer");
const Customer = require("../model/Customer");
const dotenv = require("dotenv");
const { Verifier } = require("@pact-foundation/pact");

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

describe("Customer Provider", () => {
  beforeAll(async () => {
    mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoUri = mongod.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(bodyParser.json());
    app.use("/", router);
    server = app.listen(9999);
  });

  afterAll(() => {
    mongoose.connection.close();
    mongod.stop();
    server.close();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it("Purchasing Consumer", async () => {
    const customerId = "7";
    await prepareCustomer(customerId);

    jest.setTimeout(60000);

    const opts = {
      provider: "Customer.Provider",
      providerBaseUrl: "http://localhost:9999",
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
      pactBrokerToken: process.env.PACT_BROKER_TOKEN,
      providerVersion: "1.0.0",
      consumerVersionSelectors: [{ latest: true }],
      publishVerificationResult: true,
      enablePending: false,
    };

    await new Verifier(opts).verifyProvider().then(function () {
      console.log("Provider successfully verified");
    });
  });
});
