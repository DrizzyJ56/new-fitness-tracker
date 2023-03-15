const express = require('express');
const usersRouter = express.Router();
const jwt = require("jsonwebtoken")

const {users, getUser, createUser, getUserByUsernameWithPassword} = require('../db/index');
// POST /api/users/login

// POST /api/users/register
usersRouter.post('/register', async (req,res,next) => {
    const { username, password} = req.body;
    try {
        const doesUserExist = await getUserByUsernameWithPassword(username)
        if(doesUserExist){
            next({
                name: "userAlreadyExistsError",
                message: "A user already exists with this information"
            })
        }
        if(password.length >= 8){
            const user = await createUser({username,password})

            const token = jwt.sign(
                {
                    id: user.id,
                    username,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1w",
                }
            )
            
            res.send({
                message: "Thank you for signing up!",
                token: token,
                user: user
            })
        }else{
            next({
                name: "passwordTooShort",
                message: "Your password must be atleast 8 characters long"
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = usersRouter;
