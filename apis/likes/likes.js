import { Router } from "express";
import { aggregateDocuments, deleteDocument, getFilteredDocuments, insertDocument, updateDocumentWithId } from "../../utilities/db-utils.js";
import { ObjectId } from "mongodb";

export const likesRouter = Router();


likesRouter.get('/:postId', async (req, res) => {
    let r = await getFilteredDocuments('likes', {
        postId: new ObjectId(req.params.postId)
    })
    return res.json(r)
})



likesRouter.patch('/:postId', async (req, res) => {
    let authorId = req.headers["authorId"];
    let x = await getFilteredDocuments('likes', {
        postId: new ObjectId(req.params.postId),
        authorId: new ObjectId(authorId)
    })


    if (x && x.length > 0) {
        //need to remove "like" entry
        let likeId = x[0]._id;

        await deleteDocument('likes', likeId)
        let postObject = await getFilteredDocuments('posts', { _id: new ObjectId(req.params.postId) })
        await updateDocumentWithId('posts', req.params.postId, { likes: postObject.likes - 1 })
        res.json({
            success: true
        })

    } else {
        // create "like" entry
        let r = await insertDocument('likes', {
            postId: new ObjectId(req.params.postId),
            authorId: new ObjectId(authorId)
        })

        let postObject = await getFilteredDocuments('posts', { _id: new ObjectId(req.params.postId) })
        await updateDocumentWithId('posts', req.params.postId, { likes: postObject.likes + 1 })

        res.json({
            success: true
        })
    }

})