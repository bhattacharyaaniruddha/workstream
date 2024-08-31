const mongoose = require('mongoose');
const checkListModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: "Not Started"
    },
    dateCreated: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-').toString()
    }
});

const todoSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true
    },
    originator: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
    },
    createdOn: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-').toString()
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    areaOfConcern: {
        type: String,
        required: true
    },
    reviewers: {
        type: Array,
        required: false,
        default: null
    },
    comments: {
        type: String,
        required: false
    },
    breakups: {
        type: [checkListModel], 
        required: false
    },
    assignee: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: String,
        default: "New"
    },
    resolution: {
        type: String,
        default: "NA"
    },
    projectId: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-').toString()
    }
});

const Task = mongoose.model('tasks', todoSchema);

const todoModel = {
    create: async (body) => {
        try {
            const task = new Task({
                ...body
            });
            return await task.save();
        } catch(err) {
            throw new Error("error: "+err);
        }
    },
    getTasks: async (req) => {
        try {
            let query = {};
            if (req.body.projectId !== undefined) {
                query.projectId = req.body.projectId;
            }
            // if (req.query.dateFilter !== undefined) {
            //     const today = new Date();
            //     const day = String(today.getDate()).padStart(2, '0');
            //     const month = String(today.getMonth() + 1).padStart(2, '0');
            //     const year = today.getFullYear()
            //     const formattedDate = `${day}-${month}-${year}`; // dd-mm-yyyy format
            //     if (req.query.dateFilter === 'till-date') {
            //         query.dueDate = { $lte: formattedDate };
            //     } else {
            //         query.dueDate = { $eq: formattedDate };
            //     }
            // }
            return await Task.find(query).exec();
        } catch (err) {
            throw new Error("error: " + err);
        }
    },
    
    update: async (taskId, taskTitle, priority, dueDate, description, checkLists) => {
        try {
            return await Task.findOneAndUpdate({_id: new mongoose.Types.ObjectId(taskId)}, {
                $set: {
                    taskTitle, priority, dueDate, description, checkLists
                }
            }, {new: true}).exec();
        } catch(err) {
            throw new Error("error: "+err);
        }
    },
    transferToNextDate: async (taskId, dueDate) => {
        try {
            return await Task.findOneAndUpdate({_id: new mongoose.Types.ObjectId(taskId)}, {
                $set: {
                    dueDate
                }
            }, {new: true}).exec();
        } catch(err) {
            throw new Error("error: "+err);
        }
    },
    updateStatusOfTask: async (taskId, status) => {
        try {
            return await Task.findOneAndUpdate({_id: new mongoose.Types.ObjectId(taskId)}, {
                $set: {
                    status
                }
            }, {new: true}).exec();
        } catch(err) {
            throw new Error("error: "+err);
        }
    },
    updateStatusOfCheckoutList: async (taskId, checkoutListId, status) => {
        try {
            return await Task.findOneAndUpdate({$and: [{"checkLists._id": new mongoose.Types.ObjectId(checkoutListId)},{_id: new mongoose.Types.ObjectId(taskId)}]}, {
                $set: {
                    status
                }
            }, {new: true}).exec();
        } catch(err) {
            throw new Error("error: "+err);
        }
    },
    
}

module.exports = todoModel;
