const express = require("express");
const router = express.Router();
const {isAdmin,isSignedIn,isAuthenticated }=require('../controllers/auth')
const {getUserById,addCsv }=require('../controllers/user')


router.param('userId',getUserById)

router.post('/addCsv/users/:userId',isSignedIn,isAuthenticated,isAdmin,addCsv)
