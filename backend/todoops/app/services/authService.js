const userModel = require('../models/userModel.js');

const service = {
    verifyUser: async (req, res, next) => {
        try {
            if (req.user) {
                const checkUser = await userModel.checkEmailOrUsernameExists(req.user.email, req.user.username);
                if (checkUser) {
                    next();
                } else {
                    return res.status(403).json({
                        status: "error",
                        response: "User not found. Please check your credentials."
                    });
                }
            } else {
                return res.status(401).json({
                    status: "error",
                    response: "Unauthorized access. User information is missing."
                });
            }
        } catch (err) {
            return res.status(500).json({
                status: "error",
                response: err.message || "An unexpected error occurred."
            });
        }
    }
}

module.exports = service;