const service = require('../services/service.js')
const controller = {
    create: async (req, res) => {
        try {
            const result = await service.create(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    getTasks: async (req, res) => {
        try {
            const result = await service.getTasks(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    update: async (req, res) => {
        try {
            const result = await service.update(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    transferToNextDate: async (req, res) => {
        try {
            const result = await service.transferToNextDate(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    updateStatusOfTask: async (req, res) => {
        try {
            const result = await service.updateStatusOfTask(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    updateStatusOfCheckoutList: async (req, res) => {
        try {
            const result = await service.updateStatusOfCheckoutList(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },

    addProject: async (req, res) => {
        try {
            const result = await service.addProject(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
    getProject: async (req, res) => {
        try {
            const result = await service.getProject(req, res);
            res.status(201).send(result);
        } catch(err) {
            res.status(400).send(err);
        }
    },
}

module.exports = controller;