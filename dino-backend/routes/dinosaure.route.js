const express = require('express');
const app = express();
const dinoRoute = express.Router();

// Dinosaure model
let Dinosaure = require('../models/Dinosaure');

// Add Dinosaure
dinoRoute.route('/create').post((req, res, next) => {
    Dinosaure.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get All Dinosaures
dinoRoute.route('/').get((req, res) => {
    Dinosaure.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get Dinosaure by login
dinoRoute.route('/get-by-login/:login').get((req, res) => {
    Dinosaure.findOne({login: req.params.login}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get single dinosaure
dinoRoute.route('/read/:id').get((req, res) => {
    Dinosaure.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get Dinosaure frindList
dinoRoute.route('/get-friends').get((req, res) => {
    var fiendIds = JSON.parse(req.query.friendIds);
    Dinosaure.find({_id: {$in: fiendIds }}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get Dinosaure frindList
dinoRoute.route('/get-notyetfriend').get((req, res) => {
    var notFiendIds = JSON.parse(req.query.notFiendIds);
    Dinosaure.find({_id: {$nin: notFiendIds }}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update dinosaure
dinoRoute.route('/update/:id').put((req, res, next) => {
    Dinosaure.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data);
            console.log('Data updated successfully')
        }
    })
});

// Delete dinosaure
dinoRoute.route('/delete/:id').delete((req, res, next) => {
    Dinosaure.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = dinoRoute;
