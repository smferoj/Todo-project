const express= require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');
const TodoListController = require('../controllers/todoListController');
const AuthVerifyMiddleware = require("../middlewares/authVerifyMiddleware")

// ===============Create Profile & User login ==========
 router.post("/createProfile", ProfileController.CreateProfile )
 router.post("/userLogin", ProfileController.userLogin);
 
// ================Select & Update Profile===================
 router.get("/SelectProfile", AuthVerifyMiddleware, ProfileController.SelectProfile);
 router.post("/UpdateProfile", AuthVerifyMiddleware, ProfileController.UpdateProfile);

 
//   ================Crud of TodoList=================
 router.post("/createToDo", AuthVerifyMiddleware, TodoListController.CreateToDo);
 router.get("/SelectToDo", AuthVerifyMiddleware, TodoListController.SelectToDo);
 router.post("/UpdateToDo", AuthVerifyMiddleware, TodoListController.UpdateToDo);
 router.post("/UpdateStatusToDo", AuthVerifyMiddleware, TodoListController.UpdateStatusToDo);
 router.post("/SelectToDoByStatus", AuthVerifyMiddleware, TodoListController.SelectToDoByStatus);
 router.post("/SelectToDoByDate", AuthVerifyMiddleware, TodoListController.SelectToDoByDate);
 
 
 
 module.exports = router;