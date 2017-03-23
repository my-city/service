import express = require('express');
import async = require('async');
import documentDb = require('documentdb');
import { Router, Request, Response, NextFunction } from 'express';
import { InstagramRepository } from '../repository/instagram.repository';
import { InstagramDocument } from '../models/instagram.document';


export class InstagramController {

    router: Router;
    private instagramRepository: InstagramRepository;

    constructor(instagramRepository) {
        //this.router = express.Router();
        this.instagramRepository = instagramRepository;
    }

    public GetPictures = (req: Request, res: Response) => {

        var self = this;
        let id: string = req.params.id;

        var result = self.instagramRepository.Find(id, function (err, items) {
            if (err) {
                throw (err);
            }
            res.status(200).json(items);
        });
    }

}
