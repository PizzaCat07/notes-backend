import { Router } from 'express'
import { deleteDocument, getAllDocuments } from '../../utilities/db-utils.js';
const notesRouter = Router();


notesRouter.get('/notes', (req, res) => {
    getAllDocuments('notes')
        .then(x => {
            res.send(x)
        })
})


notesRouter.post('/notes', (req, res) => {
    let body = req.body
    postMessage('notes', body)
        .then(x => {
            res.send(x)
        })
})


notesRouter.delete('/notes/:id', (req, res) => {
    let id = req.params.id
    deleteDocument('notes', id).then(x => {
        res.send(x)
    })
})

export default notesRouter