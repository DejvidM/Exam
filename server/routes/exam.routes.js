const ProjectRoutes = require('../controllers/exam.controllers')

module.exports = (app) => {
    app.get('/projects' , ProjectRoutes.AllProjects);
    app.delete(`/projects/:_id` , ProjectRoutes.removeProject);
    app.patch('/projects/:_id' , ProjectRoutes.changeStatus);
    app.post('/projects' ,ProjectRoutes.NewProject)
}
