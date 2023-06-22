import express from 'express'
import cors from 'cors'
import dotEnv from 'dotenv'
import notesRouter from './apis/notes/notes.js';
import usersRouter from './apis/users/users.js'
dotEnv.config();


const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("working")
})

app.use("/", notesRouter)
app.use("/", usersRouter)

app.listen(3001, () => {
    console.log('Server started.')
})