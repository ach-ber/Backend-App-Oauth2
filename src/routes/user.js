const express = require('express')
const router = express.Router()
const  { createUser,getAllUser,getAuthGoogle,getAuthGoogleCB,getUserDetails } = require('../controllers/user.js')
const { isLoggedIn } = require("../middlewares/auth");

router.get('/userDetail',isLoggedIn,getUserDetails);

router.post('/postUser', createUser);

router.get('/allUser', getAllUser);

router.get('/auth/google',getAuthGoogle());

router.get('/auth/google/callback',getAuthGoogleCB());

/*
router.get('/userDetail',isLoggedIn,(req, res) => {
    res.json(req.user);
});*/


module.exports = router;
