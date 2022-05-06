const uuid = require('uuid');
const Customer = require('../model/Customer');

exports.getCustomer = (req, res) => {
    const custId = req.params.customerId
    Customer.findOne({customerId: custId})
    .then(result => {
        res.status(200)
            .json( result )       

    })
    .catch(err => {
        console.log(err)
        res.status(500).send("Something went wrong")
    })
}

exports.getCustomers = (req, res) => {
    Customer.find()
        .then((result) => {
            res.status(200)
                .json({customers : result})       

        })
        .catch(err => {
            console.log(err)
            res.status(500).send("Something went wrong")
        })
}

exports.createCustomer = (req, res) => {
    let newCustomer = {customerId: uuid.v4(), ...req.body}
    console.log(newCustomer)
    Customer.create(newCustomer)
    .then(result => {res.status(201).json(newCustomer)})
    .catch(err => {
        console.log(err)
        res.status(500).send("Something went wrong")
    })
}

exports.deleteCustomer = (req, res) => {
    const custId = req.params.customerId
    Customer.findOneAndDelete({customerId: custId})
    .then((result) => {
        res.status(201)
            .json({customers : result})       

    })
    .catch(err => {
        console.log(err)
        res.status(500).send("Something went wrong")
    })
}

