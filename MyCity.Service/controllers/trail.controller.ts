import express = require('express');
import async = require('async');
import documentDb = require('documentdb');
import { Router, Request, Response, NextFunction } from 'express';
import { TrailsRepository } from '../repository/trails.repository';
import { TrailDocument } from '../models/trail.document';


export class TrailsController {

    router: Router;
    private trailsRepository : TrailsRepository;

    constructor(trailsRepository) {
        this.router = express.Router();
        this.trailsRepository = trailsRepository;
        this.Init();
    }

    public Init() {
        this.router.get("/", this.GetTrails);
        //this.router.get("/:id", this.GetTrail);
        this.router.post("/", this.AddTrail);
        this.router.put("/", this.UpdateTrail);
        //this.router.delete("/:id", this.DeleteTrail);
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

        self.trailsRepository.Find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }

            res.render('index', {
                title: 'My ToDo List ',
                tasks: items
            });
        });

    }

    public AddTrail(req: Request, res: Response) {

        var self = this;
        var item = req.body;

        self.trailsRepository.Add(item, function (err) {
            if (err) {
                throw (err);
            }

            res.redirect('/');
        });

    }

    public UpdateTrail(req: Request, res: Response) {

        var self = this;
        var completedTasks = Object.keys(req.body);

        async.forEach(completedTasks, function taskIterator(completedTask, callback) {
            self.trailsRepository.Update(completedTask, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }, function goHome(err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });

    }

}

var trailsController = new TrailsController(new TrailsRepository(documentDb.DocumentClient, "mycity", "trails"));
trailsController.Init();
var router = trailsController.router;

export default router;