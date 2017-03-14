import express = require('express');
import { Router, Request, Response, NextFunction } from 'express';
import { TrailsRepository } from '../repository/trails.repository';
import { TrailDocument } from '../models/trail.document';

export class TrailsController {

    router: Router;
    trailsRepository;

    constructor(trailsRepository) {
        this.router = express.Router();
        this.trailsRepository = trailsRepository;
        this.Init();
    }

    public Init() {
        this.router.get("/", this.GetTrails),
            this.router.get("/:id", this.GetTrail),
            this.router.post("/", this.AddTrail),
            this.router.put("/", this.UpdateTrail),
            this.router.delete("/:id", this.DeleteTrail)
    }

    public GetTrails(req: Request, res: Response) {

        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.completed=@completed',
            parameters: [{
                name: '@completed',
                value: false
            }]
        };

        self.trailsRepository.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }

            res.render('index', {
                title: 'My ToDo List ',
                tasks: items
            });
        });

    }

    public GetTrail(req: Request, res: Response) {

        let query: string = req.params.id;

        this.trailsRepository.GetTrail(query).then(requestResult => {
            res.status(200).send(requestResult);
        }).catch(e => {
            res.status(404).send({
                message: e.message,
                status: res.status
            });
        });

    }

    public AddTrail(req: Request, res: Response) {

        var doc: TrailDocument = <TrailDocument>req.body;

        this.trailsRepository.AddTrail(doc).then(requestResult => {
            res.status(200).send(requestResult);
        }).catch(e => {
            res.status(404).send({
                message: e.message,
                status: res.status
            });
        });

    }

    public UpdateTrail(req: Request, res: Response) {

        var doc: TrailDocument = <TrailDocument>req.body;

        this.trailsRepository.UpdateTrail(doc).then(requestResult => {
            res.status(200).send(requestResult);
        }).catch(e => {
            res.status(404).send({
                message: e.message,
                status: 404
            });
        });

    }

    public DeleteTrail(req: Request, res: Response) {

        let query: string = req.params.id;

        this.trailsRepository.DeleteTrailAsync(query).then(requestResult => {
            res.status(204).send();
        }).catch(e => {
            res.status(404).send({
                message: e.message,
                status: 404
            });
        });

    };

}


let trailsController = new TrailsController(new TrailsRepository( null, "mycity", "trails"));
trailsController.Init();
var router = trailsController.router;

export default router;