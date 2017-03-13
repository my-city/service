import express = require('express');
import { Router, Request, Response, NextFunction } from 'express';
import { TrailData } from '../models/trail.data';
import { TrailDocument } from '../models/trail.document';

export class TrailRouter {

    router: Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    public GetTrails(req: Request, res: Response) {

        var data: TrailData = new TrailData();

        data.GetTrailsAsync().then(requestResult => {
            res.status(200).send(requestResult);
        }).catch(e => {
            res.status(404).send({
                message: e.message,
                status: res.status
            });
        });

    }

    public GetTrail(req: Request, res: Response) {

        let query: string = req.params.id;
        var data: TrailData = new TrailData();

        data.GetTrailAsync(query).then(requestResult => {
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

        data.AddTrailAsync(doc).then(requestResult => {
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

        data.UpdateTrailAsync(doc).then(requestResult => {
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