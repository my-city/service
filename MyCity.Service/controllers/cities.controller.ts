import express = require('express');
import async = require('async');
import documentDb = require('documentdb');
import { Router, Request, Response, NextFunction } from 'express';
import { CitiesRepository } from '../repository/cities.repository';
import { CityDocument } from '../models/city.document';


export class CitiesController {

    router: Router;
    private CitiesRepository: CitiesRepository;

    constructor (citiesRepository) {
        //this.router = express.Router();
        this.CitiesRepository = citiesRepository;
        this.Init();
    }

    public Init = () => {
        
    }

    public GetCities = (req: Request, res: Response) => {

        var self = this;

        var querySpec =
            {
                query: 'SELECT * FROM root',
                parameters: []
            };

        self.CitiesRepository.Find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }

            res.status(200).json(items);

        });

    }

}
