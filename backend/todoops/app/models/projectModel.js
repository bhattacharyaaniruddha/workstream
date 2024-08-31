const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    originator: {
        type: String,
        required: true
    },
    gitLink: {
        type: String,
        required: true
    },
    createdOn: {
        type: String,
        required: true,
        default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-').toString()
    },
    targetDate: {
        type: String,
        require: true
    },
    cownerCompany: {
        type: Array,
        required: true
    },
    managers: {
        type: Array,
        required: false,
        default: null
    },
    description: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false,
        default: 'Not Started'
    }
});

const Project = mongoose.model('projects', projectSchema);



const projectModel = {

    addProject: async (body) => {
        try {
            const project = new Project({
                ...body
            });
            return await project.save();
        } catch(err) {
            throw new Error("error: "+err);
        }
    },

    getProject: async (req) => {
        try {
            let query = {};
            return await Project.find(query).exec();
        } catch (err) {
            throw new Error("error: " + err);
        }
    },
}

module.exports = projectModel;