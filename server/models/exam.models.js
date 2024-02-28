const mongoose = require('mongoose');

const ProjectSchema  = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Name of the project is required'],
        minlength : [3 , 'Project name must be at least 3 characters']
    },
    due_date : {
        type : Date,
        required : [true , 'Due Date is required'],
    },
    status : {
        type : String,
        default : 'Not working'
    }
}, {timestamps : true}
)

const Project = mongoose.model('Project' , ProjectSchema);

module.exports = Project;