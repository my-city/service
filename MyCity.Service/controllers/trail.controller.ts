import express = require('express');
import { Router, Request, Response, NextFunction } from 'express';
import { TrailData } from '../models/trail.data';
import { TrailDocument } from '../models/trail.document';

export class TrailController {

    router: Router;
    trailData;
    constructor(trailData) {
        this.router = express.Router();
        this.trailData = trailData;
        this.init();
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

        self.trailData.find(querySpec, function (err, items) {
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

        data.GetTrail(query).then(requestResult => {
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
        var data: TrailData = new TrailData();

        data.AddTrail(doc).then(requestResult => {
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
        var data: TrailData = new TrailData();

        data.UpdateTrail(doc).then(requestResult => {
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
        var data: TrailData = new TrailData();

        data.DeleteTrailAsync(query).then(requestResult => {
            res.status(204).send();
        }).catch(e => {
            res.status(404).send({
                message: e.message,
                status: 404
            });
        });

    };

    public init() {
        this.router.get("/", this.GetTrails),
        this.router.get("/:id", this.GetTrail),
        this.router.post("/", this.AddTrail),
        this.router.put("/", this.UpdateTrail),
        this.router.delete("/:id", this.DeleteTrail)
    }

}

let trailRouter = new TrailRouter();
trailRouter.init();
var router = trailRouter.router;

export default router;