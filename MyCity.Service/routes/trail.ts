/*
 * GET trails listing.
 */
import express = require('express');
const router = express.Router();

var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');




router.get('/', (req: express.Request, res: express.Response) => {
    res.send("List of trails");
});

export default router;