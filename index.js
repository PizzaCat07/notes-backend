import express from 'express'
import cors from 'cors'
import dotEnv from 'dotenv'
import mongo from 'mongodb'
import notesRouter from './apis/notes/notes.js';
import usersRouter from './apis/users/users.js'
import booksRoutes from './apis/books/books.js';
import { postsRoutes } from './apis/posts/posts.js';
import { authenticate } from './utilities/middlewares.js';
import { upload } from './utilities/grid-fs.util.js';
dotEnv.config();


const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send("working")
})



var bucket;
async function createGridStream() {
  return new Promise((resolve, reject) => {
    new mongo.MongoClient(process.env.CONNECTION_STRING).connect().then(client => {
      const db = client.db(process.env.DEFAULT_DATABASE);
      resolve(new mongo.GridFSBucket(db, { bucketName: 'uploads' }));
    }).catch(e => {
      reject(e)
    })
  })
}



//to upload a file
app.post('/app-image-upload', upload.single('myFile'), (req, res) => {
    res.json(req.file)

})

// to retrieve a file
app.get('/image/:filename', (req, res) => {
    bucket.find({ filename: req.params.filename }).toArray().then((files) => {
        console.log({files})
    
        // Check if files

        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        const stream = bucket.openDownloadStreamByName(req.params.filename)
        stream.pipe(res)
    });
});




app.use("/notes", authenticate, notesRouter)
app.use("/books", authenticate, booksRoutes)
app.use("/posts", authenticate, postsRoutes)
app.use("/", usersRouter)




createGridStream().then(x => {
    bucket = x;
    app.listen(process.env.PORT, () => {
        console.log('Server started...')
    })

})
