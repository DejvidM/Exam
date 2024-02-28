const Project = require('../models/exam.models')

module.exports.AllProjects = (req , res) => {
    Project.find()
        .then((allProjects) => res.json(allProjects))
        .catch((err) => res.json(err))
}

module.exports.removeProject = (req , res) => {
    Project.deleteOne( {_id : req.params._id})
        .then((deleted) => res.json(deleted))
        .catch((err) => res.json(err))
}

module.exports.changeStatus = (req , res) => {
    Project.updateOne({ _id : req.params._id} , req.body , {runValidators : true})
        .then((editedProject) => res.json(editedProject))
        .catch((err) => res.json(err))
}

module.exports.NewProject = (req , res) => {
    Project.create(req.body)
        .then((newProject) => res.json(newProject))
        .catch((err) => res.status(400).json(err))
}
