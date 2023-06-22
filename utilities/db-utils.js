import { MongoClient, ObjectId } from 'mongodb'

function getClient() {
    return new MongoClient(process.env.CONNECTION_STRING);
}

export function getAllDocuments(collectionName) {
    return getClient().connect().then(connection => {
        const db = connection.db('lookup-demo');
        return db.collection(collectionName)
            .find()
            .toArray()
    })
}


export function getFilteredDocuments(collectionName, query) {
    return getClient().connect().then(connection => {
        const db = connection.db('lookup-demo');
        return db.collection(collectionName)
            .find(query)
            .toArray()
    })
}


export function insertDocument(collectionName, document) {
    return getClient().connect().then(connection => {
        const db = connection.db('lookup-demo')
        return db.collection(collectionName)
            .insertOne(document)
            .then(x => {
                return db.collection(collectionName)
                    .find()
                    .toArray()
            })
    })
}


export function deleteDocument(collectionName, id) {
    return getClient().connect().then(connection => {
        const db = connection.db('lookup-demo')
        return db.collection(collectionName)
            .deleteOne({ "_id": new ObjectId(id) })
            .then(x => {
                return db.collection('songs')
                    .find()
                    .toArray()

            })
    })
}

// module.exports = { getAllDocuments, insertDocument, deleteDocument, getFilteredDocuments }
