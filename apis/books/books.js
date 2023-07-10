import { Router } from "express";
import { getAllDocuments, getPagedDocuments } from "../../utilities/db-utils.js";

const booksRoutes = Router();

booksRoutes.get('/', (req, res) => {
    
    let page = req.query.page;
    if (page) {
        let itemsPerPage = req.query.itemsPerPage ?? 10;
        getPagedDocuments('books', page, itemsPerPage)
            .then(x => {
                res.json(x)
            })
    } else {
        // read all docs
        getAllDocuments('books')
            .then(x => {
                res.json(x)
            })
    }

})

export default booksRoutes;

