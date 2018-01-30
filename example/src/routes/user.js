'use strict';
const express = require('express');

const userRouter = express.Router();

// Ephemeral in-memory data store
const users = [{
    id: 1,
    name: 'Joe'
}, {
    id: 2,
    name: 'Jane'
},
    {
        id: 2,
        name: 'Jane'
    }];
let userIdCounter = users.length;
const getUser = (userId) => users.find(u => u.id === parseInt(userId));

const getUserIndex = (userId) => users.findIndex(u => u.id === parseInt(userId));


//Get all users
userRouter.get('/', (req, res) => {
    res.json(users);
});

userRouter.delete('/users/:userId', (req, res) => {
    const userIndex = getUserIndex(req.params.userId);

    if(userIndex === -1) return res.status(404).json({});

    users.splice(userIndex, 1);
    res.json(users);
});

//Get a user a with a specific Id
userRouter.get('/:user_id', (req, res) => {
    const user = getUser(req.params.userId);

    if (!user) return res.status(404).json({});

    return res.json(user);
});

//Add a user
userRouter.post('/', (req, res) => {
    const user = {
        id: ++userIdCounter,
        name: req.body.name
    };
    users.push(user);
    res.status(201).json(user);
});


//Update a user
userRouter.put('/:user_id', (req, res) => {
    const user = getUser(req.params.userId);

    if (!user) return res.status(404).json({});

    user.name = req.body.name;
    res.json(user);
});
module.exports = userRouter;