const express = require('express');
const todoModel = require("../models/todoModel.js");
const userModel = require('../models/userModel.js');
const projectModel = require('../models/projectModel.js');
const jwt = require('jsonwebtoken');
const secretKey = 'lh:&9A![Ipp*,:7cA_@-okrww[a.^Sk^fyH|)SpK';
const { emitNotification } = require('../utils/socket.js');


const generateToken = (user, expiry) => {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
    fullname: user.fullName,
    role: user.role, 
    isManager: user.isManager,
    isEnabled: user.isEnabled,
    lastLogin: user.lastLogin,
    company: user.company
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: `${expiry}h` }); 
  return token;
};

const service = {
    create: async (req, res) => {
        try {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            
            let body = {
                taskTitle: req.body.title,
                originator: req.body.originator,
                priority: req.body.priority,
                createdOn: new Date().toLocaleDateString('en-GB', options).split('/').join('-').toString(),
                description: req.body.description,
                type: req.body.type,
                areaOfConcern: req.body.areaOfConcern,
                reviewers: req.body.reviewers,
                comments: req.body.comments,
                breakups: req.body.checkLists,
                assignee: req.body.assignee,
                status: 'New',
                resolution: 'NA',
                projectId: req.body.projectId,
                projectName: req.body.projectName,
                dueDate: new Date(req.body.dueDate).toLocaleDateString('en-GB', options).split('/').join('-').toString()
            }

            const result = await todoModel.create(body);

            let messageCalc = `New task <b>${body.taskTitle}</b> is created for project ${body.projectName} by ${body.originator}.`

            emitNotification('addToBackLogs', { message: messageCalc, data: body });

            return ({
                status: "success",
                response: "Task created successfully."
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },

    getTasks: async (req, res) => {
        try {

            const result = await todoModel.getTasks(req);

            return ({
                status: "success",
                response: result
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },

    update: async (req, res) => {
        try {

            const result = await todoModel.update(req.body.taskId, req.body.taskTitle, req.body.priority, req.body.dueDate, req.body.description, req.body.checkLists);

            return ({
                status: "success",
                response: "Task updated successfully."
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },

    transferToNextDate: async (req, res) => {
        try {

            const result = await todoModel.transferToNextDate(req.body.taskId, req.body.dueDate);

            return ({
                status: "success",
                response: "Task updated successfully."
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },
    updateStatusOfTask: async (req, res) => {
        try {

            const result = await todoModel.updateStatusOfTask(req.body.taskId, req.body.status);

            return ({
                status: "success",
                response: "Task updated successfully."
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },
    updateStatusOfCheckoutList: async (req, res) => {
        try {

            const result = await todoModel.updateStatusOfCheckoutList(req.body.taskId, req.body.status);

            return ({
                status: "success",
                response: "Task updated successfully."
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },


















    addUser: async (req, res) => {
        try {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            
            let body = {
                username: req.body.username, 
                fullName: req.body.fullname, 
                email: req.body.email, 
                role: 'User', 
                department: req.body.department, 
                jobTitle: req.body.jobTitle, 
                isManager: req.body.isManager, 
                company: req.body.company, 
                location: req.body.location, 
                lastLogin: new Date(), 
                password: req.body.password, 
                enabled: req.body.isEnabled, 
                dateCreated: new Date(req.body.dueDate).toLocaleDateString('en-GB', options).split('/').join('-').toString()
            }

            const result = await userModel.addUser(body);

            let messageCalc = `New user <b>${body.username}</b> is created by ${req.user.fullname}.`


            emitNotification('addUsers', { message: messageCalc, data: body });

            return ({
                status: "success",
                response: "User added successfully."
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },
    getUsers: async (req, res) => {
        try {
            if (req.user) {
                const checkUser = await userModel.checkEmailOrUsernameExists(req.user.email, req.user.username);
                if (checkUser) {
                    const result = await userModel.getUsers(req);
                    return ({
                        status: "success",
                        response: result
                    });
                } else {
                    throw new Error("User not found. Please check your credentials.");
                }
            } else {
                throw new Error("Unauthorized access. User information is missing.");
            }
        } catch (err) {
            return ({
                status: "error",
                response: err.message || "An unexpected error occurred while fetching users."
            });
        }
    },
    

    addGroup: async (req, res) => {
        try {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            
            let body = {
                groupName: req.body.groupName,
                allUsers: req.body.allUsers,
                enabled: req.body.isEnabled, 
                dateCreated: new Date(req.body.dueDate).toLocaleDateString('en-GB', options).split('/').join('-').toString()
            }

            const result = await userModel.addGroup(body);

            let messageCalc = `New group <b>${body.groupName}</b> is created by ${req.user.fullname}.`

            emitNotification('addGroups', { message: messageCalc, data: body });


            return ({
                status: "success",
                response: "Group added successfully."
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },

    getGroup: async (req, res) => {
        try {

            const result = await userModel.getGroup(req);

            return ({
                status: "success",
                response: result
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },
    getCompanies: async (req, res) => {
        try {

            const result = await userModel.getCompanies(req);

            return ({
                status: "success",
                response: result
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },
    getAllManagersByCoy: async (req, res) => {
        try {

            const result = await userModel.getAllManagersByCoy(req);

            return ({
                status: "success",
                response: result
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },
    registerNewUser: async (req, res) => {
        try {

            const checkMail = await userModel.checkEmailOrUsernameExists(req.body.email, req.body.username);

            if(checkMail === 'present') {
                return ({
                    status: "error",
                    response: 'User with same username or email already present.'
                })
            } else {
                const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            
                let body = {
                    username: req.body.username, 
                    fullName: req.body.fullname, 
                    email: req.body.email, 
                    role: 'User', 
                    department: req.body.department, 
                    jobTitle: 'NA', 
                    isManager: false, 
                    company: req.body.company, 
                    location: 'NA', 
                    lastLogin: new Date(), 
                    password: req.body.password, 
                    enabled: true, 
                    dateCreated: new Date(req.body.dueDate).toLocaleDateString('en-GB', options).split('/').join('-').toString()
                }
    
                const result = await userModel.addUser(body);
                console.log(result)
                let userBody = {
                    _id: result._id,
                    email: req.body.email,
                    username: req.body.username,
                    fullname: req.body.fullname,
                    role: 'User', 
                    isManager: 'NA',
                    isEnabled: true,
                    lastLogin: new Date(),
                    company: req.body.company
                }
                let refreshToken = generateToken(userBody, '24');
                let accessToken = generateToken(userBody, '1');
                return ({
                    status: "success",
                    response: "User registered successfully.",
                    refreshToken: refreshToken,
                    accessToken: accessToken
                })
            }
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },

    login: async (req, res) => {
        try {

            const checkMail = await userModel.checkEmailOrUsernameExists(req.body.email, req.body.email);

            if(checkMail === 'not-present') {
                return ({
                    status: "error",
                    response: 'User with same username or email not present.'
                })
            } else {            
                let body = {
                    email: req.body.email, 
                    password: req.body.password, 
                }
    
                const result = await userModel.login(body);

                if(result[0] === 'present') {
                    let refreshToken = generateToken(result[1], '24');
                    let accessToken = generateToken(result[1], '1');
                    return ({
                        status: "success",
                        response: "User loggedin successfully.",
                        refreshToken: refreshToken,
                        accessToken: accessToken
                    })
                } else {
                    return ({
                        status: "error",
                        response: "Incorrect email/username/password. Can't logged you in."
                    })
                }
    
                
            }
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },

































    addProject: async (req, res) => {
        try {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            
            let body = {
                projectName: req.body.projectName,
                originator: req.body.originator,
                gitLink: req.body.gitLink,
                cownerCompany: req.body.cownerCompany,
                managers: req.body.managers,
                description: req.body.description,
                targetDate: req.body.targetDate.split('T')[0],
                createdOn: new Date(new Date()).toLocaleDateString('en-GB', options).split('/').join('-').toString()
            }

            const result = await projectModel.addProject(body);
            let messageCalc = `New project <b>${body.projectName}</b> is created by ${body.originator}.`
            emitNotification('addProjects', { message: messageCalc, data: body });

            return ({
                status: "success",
                response: "Project added successfully."
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },

    getProject: async (req, res) => {
        try {

            const result = await projectModel.getProject(req);

            return ({
                status: "success",
                response: result
            })
        } catch(err) {
            return ({
                status: "error",
                response: err.toString()
            })
        }
    },
}

module.exports = service;