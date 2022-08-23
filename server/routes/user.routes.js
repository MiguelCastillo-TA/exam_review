const { authenticate } = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.post('/api/user/create', UserController.createUser)
    app.post('/api/user/login', UserController.loginUser)
    app.get("/api/users", authenticate, UserController.getAll)
}