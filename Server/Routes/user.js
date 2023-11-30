const express = require('express');
const router = express.Router();

const userController = require('../Controllers/user')

router.post("/signup", userController.user_Signup);

router.post("/login", userController.user_Login);

router.delete("/:userId", userController.user_delete);  

module.exports = router;