import { Router } from 'express'
import { getAllDocuments } from '../../utilities/db-utils.js';

export const postsRoutes = Router();

postsRoutes.get('/', (req, res) => {


    // looup query

    res.json([
        {
            content: "Heey",
            authorUsername:"Admin",            
        }
    ])

})
