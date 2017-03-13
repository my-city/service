﻿/*
 * GET trails listing.
 */
import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    res.send("List of trails");
});

export default router;