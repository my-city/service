import express = require('express');
import async = require('async');
import documentDb = require('documentdb');
import { Router, Request, Response, NextFunction } from 'express';
import { UsersRepository } from '../repository/users.repository';
import { UserDocument } from '../models/user.document';


export class UsersController {

    private UsersRepository : UsersRepository;

    constructor(usersRepository) {
        this.UsersRepository = usersRepository;
        this.Init();
    }

    public Init() {
    }

    public GetUser(req: Request, res: Response) {

        var self = this;
        let id: string = req.params.id;

        self.UsersRepository.Get(id, function (err, item) {
            if (err) {
                throw (err);
            }

            res.status(200).json(item);
        });

    }


    public AddUser(req: Request, res: Response) {

        var self = this;
        var item = req.body;

        self.UsersRepository.Add(item, function (err) {
            if (err) {
                throw (err);
            }

            res.redirect('/');
        });

    }

}
