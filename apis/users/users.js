import { Router } from "express";
import jwt from 'jsonwebtoken'
import { getFilteredDocuments, insertDocument } from "../../utilities/db-utils.js";

const usersRouter = Router();


usersRouter.get('/login', async (req, res) => {
    let username = req.headers.username;
    let password = req.headers.password;

    getFilteredDocuments('users', { username, password })
        .then(users => {
            console.log("testes", { username, password, users })
            if (users.length > 0) {
                let token = jwt.sign({
                    username
                }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE})

                console.log(token)
                res.json({
                    status: true,
                    token
                })
            } else {
                res.json({
                    status: false,
                    token: ''
                })
            }
        })
    // let users = await 



})


usersRouter.post("/signup", (req, res) => {
    let obj = req.body;

    insertDocument('users', obj).then(x => {
        res.send({
            success: true
        })
    })
})




export default usersRouter;