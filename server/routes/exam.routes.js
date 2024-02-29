const ProjectRoutes = require('../controllers/exam.controllers')

module.exports = (app) => {
    app.get('/api/projects' , ProjectRoutes.AllProjects);
    app.delete(`/api/projects/:_id` , ProjectRoutes.removeProject);
    app.patch('/api/projects/:_id' , ProjectRoutes.changeStatus);
    app.post('/api/projects' ,ProjectRoutes.NewProject)
}
