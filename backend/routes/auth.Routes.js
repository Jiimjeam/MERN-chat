import express from 'express'

import {Userlogin, Usersignup, Userlogout} from '../controller/auth.controller.js'

const router = express.Router();

router.post("/signup", (req, res) => {
    Usersignup(req, res)
});

router.post("/login", (req, res) => {
    Userlogin(req, res)
});

router.post("/logout", (req, res) => {
    Userlogout(req, res)
});



export default router