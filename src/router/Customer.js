const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const controller = require('../controller/Customer');


router.get('/customers', controller.getCustomers);
router.get('/customers/:customerId', controller.getCustomer);
router.delete('/customers/:customerId', controller.deleteCustomer);
router.post('/customers',
    body('name').trim().isLength({ min: 10 }),
    controller.createCustomer);
module.exports = router;