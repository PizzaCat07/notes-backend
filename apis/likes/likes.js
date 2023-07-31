import { Router } from "express";
import { aggregateDocuments, deleteDocument, getFilteredDocuments, insertDocument, updateDocumentWithId } from "../../utilities/db-utils.js";
import { ObjectId } from "mongodb";

export const likesRouter = Router();


likesRouter.get('/:postId', async (req, res) => {
    let r = await aggregateDocuments('likes', [{
        $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "authorsThatMatched"
        }
    },
    {
        $addFields: { author: { $first: "$authorsThatMatched" } }
    },
    {
        $project: { authorsThatMatched: false, "author.password": false }
    }])

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
        let postObject = (await getFilteredDocuments('posts', { _id: new ObjectId(req.params.postId) }))[0]
        console.log(postObject)
        let newLikes = isNaN(postObject?.likes) ? 0 : Number(postObject?.likes) - 1;
        await updateDocumentWithId('posts', req.params.postId, { likes: newLikes })
        res.json({
            success: true
        })

    } else {
        // create "like" entry
        await insertDocument('likes', {
            postId: new ObjectId(req.params.postId),
            authorId: new ObjectId(authorId)
        })

        let postObject = (await getFilteredDocuments('posts', { _id: new ObjectId(req.params.postId) }))[0]
        console.log(postObject)
        
        let newLikes = isNaN(postObject?.likes) ? 0 : Number(postObject?.likes) + 1;
        await updateDocumentWithId('posts', req.params.postId, { likes: newLikes })

        res.json({
            success: true
        })
    }

})