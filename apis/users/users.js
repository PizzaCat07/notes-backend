import { Router } from "express";
import { getFilteredDocuments, insertDocument } from "../../utilities/db-utils.js";

const usersRouter = Router();


usersRouter.get('/login', async (req, res) => {
    let username = req.headers.username;
    let password = req.headers.password;

    let users = await getFilteredDocuments('users', { username, password })

    if (users.length > 0) {
        res.json({
            status: true
        })
    } else {
        res.json({
            status: false
        })
    }

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