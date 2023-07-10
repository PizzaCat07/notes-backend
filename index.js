import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotEnv from 'dotenv'
import notesRouter from './apis/notes/notes.js';
import usersRouter from './apis/users/users.js'
import booksRoutes from './apis/books/books.js';
dotEnv.config();


const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("working")
})


function authenticate(req, res, next) {
    // it will decide if you are authentic user or not
    let token = req.headers.token;
    try {
        let decoded = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch {
        res.json({
            status: false,
            message: 'Unauthorized'
        })
    }

}

app.use("/notes", authenticate, notesRouter)
app.use("/books", authenticate, booksRoutes)
app.use("/", usersRouter)

app.listen(3001, () => {
    console.log('Server started.')
})