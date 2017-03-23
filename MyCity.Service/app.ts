import express = require('express');
import path = require('path');
//import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import TrailsContoller = require('./controllers/trails.controller');
import TrailsRepository = require('./repository/trails.repository');

import CitiesContoller = require('./controllers/cities.controller');
import CitiesRepository = require('./repository/cities.repository');

import InstagramContoller = require('./controllers/instagram.controller');
import InstagramRepository = require('./repository/instagram.repository');

import attractions from './controllers/attractions.controller';
import root from './controllers/index.controller';

var DocumentDBClient = require('documentdb').DocumentClient;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', root);
app.use('/attractions', attractions);

// TODO: rafactor to move to another class
var docDbClient = new DocumentDBClient("DOCUMENT_DB_HOST", { masterKey: "DOC_DB PRIVATE KEY" });

var citiesRepository = new CitiesRepository.CitiesRepository(docDbClient, "mycity", "cities");
citiesRepository.Init(function (err) { if (err) throw err; });

var citiesController = new CitiesContoller.CitiesController(citiesRepository);
app.get('/cities', citiesController.GetCities.bind(citiesController));
app.get('/cities/:id', citiesController.GetCity.bind(citiesController));

var trailsRepository = new TrailsRepository.TrailsRepository(docDbClient, "mycity", "trails");
trailsRepository.Init(function (err) { if (err) throw err; });

var trailsController = new TrailsContoller.TrailsController(trailsRepository);

app.get('/trails', trailsController.GetTrails.bind(trailsController));
app.get('/trails/:id', trailsController.GetTrail.bind(trailsController));

app.post('/trails', trailsController.AddTrail.bind(trailsController));
app.put('/trails/', trailsController.UpdateTrail.bind(trailsController));


var instagramRepository = new InstagramRepository.InstagramRepository();
var instagramController = new InstagramContoller.InstagramController(instagramRepository);

app.get('/pictures/:id', instagramController.GetPictures.bind(instagramController));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {

        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
