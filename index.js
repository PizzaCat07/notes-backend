import express from 'express'
import cors from 'cors' 
import dotEnv from 'dotenv'
import notesRouter from './apis/notes/notes.js';
import usersRouter from './apis/users/users.js'
import booksRoutes from './apis/books/books.js';
import { postsRoutes } from './apis/posts/posts.js';
import { authenticate } from './utilities/middlewares.js';
dotEnv.config();


const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("working")
})



app.use("/notes", authenticate, notesRouter)
app.use("/books", authenticate, booksRoutes)
app.use("/posts", authenticate, postsRoutes)
app.use("/", usersRouter)

app.listen(3001, () => {
    console.log('Server started.')
})