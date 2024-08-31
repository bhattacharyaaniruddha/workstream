const mongoose = require('mongoose');
const { addUser } = require('../services/service');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    isManager: {
        type: Boolean,
        required: true,
        default: false
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    lastLogin: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    enabled: {
        type: Boolean,
        required: true,
        default: false
    },
    dateCreated: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-').toString()
    }
});


const groupUserModelSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    allUsers: {
        type: [groupUserModelSchema],
        required: true
    },
    enabled: {
        type: Boolean,
        required: false,
        default: false
    },
    dateCreated: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-').toString()
    }
});

const User = mongoose.model('users', userSchema);
const Group = mongoose.model('groups', groupSchema);

const userModel = {
    addUser: async (body) => {
        try {
            const user = new User({
                ...body
            });
            return await user.save();
        } catch(err) {
            throw new Error("error: "+err);
        }
    },

    getUsers: async (req) => {
        try {
            let query = {};
            return await User.find(query, {password: 0}).exec();
        } catch (err) {
            throw new Error("error: " + err);
        }
    },

    addGroup: async (body) => {
        try {
            const group = new Group({
                ...body
            });
            return await group.save();
        } catch(err) {
            throw new Error("error: "+err);
        }
    },

    getGroup: async (req) => {
        try {
            let query = {};
            return await Group.find(query).exec();
        } catch (err) {
            throw new Error("error: " + err);
        }
    },

    getCompanies: async (req) => {
        try {
            let query = {
            };
            const results = await User.find(query, { company: 1 }).exec();
            console.log(results)
            const distinctCompanies = [...new Set(results.map(emp => emp.company).filter(company => company !== null && company !== undefined))];
            return distinctCompanies.length > 0 ? distinctCompanies : [];
        } catch (err) {
            throw new Error("error: " + err);
        }
    },

    getAllManagersByCoy: async (req) => {
        try {
            return await User.aggregate([
                {
                  $group: {
                    _id: "$company",
                    users: {
                      $push: {
                        _id: "$_id",
                        email: "$email",
                        fullName: "$fullName",
                        username: "$username"
                      }
                    }
                  }
                },
                {
                  $project: {
                    _id: 1,
                    users: 1 
                  }
                }
              ]);
        } catch (err) {
            throw new Error("error: " + err);
        }
    },

    checkEmailOrUsernameExists: async (email, username) => {
        try {
            let query = {
                "$or": [
                    {"email" : email},
                    {"username": username}
                ] 
            };
            const results = await User.find(query, { password: 0 }).exec();

            if(results.length) {
                return "present"
            } else {
                return "not-present"
            }

        } catch (err) {
            throw new Error("error: " + err);
        }
    },

    login: async (body) => {
        try {
            console.log("reached here")
            let query = {
                "$and": [
                    {
                        "$or": [
                            {"email" : body.email},
                            {"username": body.email}
                        ],
                    },
                    {"password": body.password}
                ]
            };
            const results = await User.find(query, { password: 0 }).exec();
            if(results.length) {
                return ["present", results[0]]
            } else {
                return ["not-present", []]
            }

        } catch (err) {
            throw new Error("error: " + err);
        }
    },
}

module.exports = userModel;