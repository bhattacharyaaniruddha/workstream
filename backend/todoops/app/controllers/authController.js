const verifyUserService = require('../services/authService.js')
const controller = {
    verifyUser: async (req, res, next) => {
        await verifyUserService.verifyUser(req, res, next);
    },
}
module.exports = controller;