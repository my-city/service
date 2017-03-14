import express = require('express');
import async = require('async');
import documentDb = require('documentdb');
import { Router, Request, Response, NextFunction } from 'express';
import { AttractionsRepository } from '../repository/attractions.repository';
import { AttractionDocument } from '../models/attraction.document';


export class AttractionsController {

    router: Router;
    private attractionsRepository: AttractionsRepository;

    constructor (attractionsRepository) {
        this.router = express.Router();
        this.attractionsRepository = attractionsRepository;
        this.Init();
    }

    public Init = () => {
        this.router.get("/", this.GetAttrations);
    }

    public GetAttrations = (req: Request, res: Response) => {

        let repo = new AttractionsRepository(documentDb.DocumentClient, "mycity", "trails")

        //var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r',
            parameters: []
        };

        repo.Find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }
            res.status(200).json(items);
        });

    }

}

var attractionsController = new AttractionsController(new AttractionsRepository(documentDb.DocumentClient, "mycity", "trails"));
attractionsController.Init();
var router = attractionsController.router;

export default router;