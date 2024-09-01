const service = require('../services/service.js')
const controller = {
    addUser: async (req, res) => {
        try {
            const result = await service.addUser(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    getUsers: async (req, res) => {
        try {
            const result = await service.getUsers(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    addGroup: async (req, res) => {
        try {
            const result = await service.addGroup(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    getGroup: async (req, res) => {
        try {
            const result = await service.getGroup(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    getCompanies: async (req, res) => {
        try {
            const result = await service.getCompanies(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    getAllManagersByCoy: async (req, res) => {
        try {
            const result = await service.getAllManagersByCoy(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    registerNewUser: async (req, res) => {
        try {
            const result = await service.registerNewUser(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    login: async (req, res) => {
        try {
            console.log("xxxx")
            const result = await service.login(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
}

module.exports = controller;