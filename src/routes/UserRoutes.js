const routes = require("express").Router();
const userController = require("../controllers/UserController");

routes.post("/users",userController.signup)
routes.get("/users", userController.getAllUser);
routes.post("/users", userController.addUser);
routes.delete("/users/:id", userController.deleteUser);
routes.get("/users/:id", userController.getUserById);
routes.post("/users/login",userController.loginUser)
routes.post("/users/forgotpassword",userController.forgotPassword)
routes.post("/users/resetpassword",userController.resetpassword)
routes.put('/users/:id', userController.updateUser);
module.exports = routes;