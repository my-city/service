import { DocumentClient, SqlQuerySpec, RequestCallback, QueryError, RequestOptions, SqlParameter, RetrievedDocument } from 'documentdb';
import { Promise } from 'promise';
import { Config } from '../config';
import { DocumentdbUtils } from '../untils/documentdb.utils';

export class TrailsRepository {

    private client;
    private databaseId;
    private collectionId;
    private database;
    private collection;
    private documentDbUtils;

    constructor(documentDBClient, databaseId, collectionId) {
        this.client = documentDBClient;
        this.databaseId = databaseId;
        this.collectionId = collectionId;
        this.documentDbUtils = new DocumentdbUtils();//docdbUtils;
        this.database = null;
        this.collection = null;
    }

    public Init(callback) {
        var self = this;

        self.documentDbUtils.GetOrCreateDatabase(self.client, self.databaseId, function (err, db) {
            if (err) {
                callback(err);
            } else {
                self.database = db;
                self.documentDbUtils.GetOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                    if (err) {
                        callback(err);

                    } else {
                        self.collection = coll;
                    }
                });
            }
        });
    }

    public GetTrail(querySpec, callback) {
        var self = this;

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                callback(null, results);
            }
        });
    }

    public AddTrail (item, callback) {
        var self = this;

        item.date = Date.now();
        item.completed = false;

        self.client.createDocument(self.collection._self, item, function (err, doc) {
            if (err) {
                callback(err);

            } else {
                callback(null, doc);
            }
        });
    }

    public UpdateTrail (itemId, callback) {
        var self = this;

        self.GetItem(itemId, function (err, doc) {
            if (err) {
                callback(err);

            } else {
                doc.completed = true;

                self.client.replaceDocument(doc._self, doc, function (err, replaced) {
                    if (err) {
                        callback(err);

                    } else {
                        callback(null, replaced);
                    }
                });
            }
        });
    }

    public GetTrail (itemId, callback) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                name: '@id',
                value: itemId
            }]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                callback(null, results[0]);
            }
        });
    }

    //public GetTrailsAsync = () => {

    //    var that = this;

    //    return new Promise<TrailDocument>((resolve, reject) => {

    //        var options: RequestOptions = {};
    //        var params: SqlParameter[] = [];

    //        var query: SqlQuerySpec = {
    //            query: "select * from trails",
    //            parameters: params
    //        };

    //        this._client.queryDocuments(this._config.trailsCollectionId, query)
    //            .toArray((error: QueryError, result: RetrievedDocument<TrailDocument>[]): void => {

    //                if (error) { reject(error); }

    //                if (result.length > 0) {
    //                    resolve(<Array<TrailDocument>>result);
    //                }
    //                else {
    //                    reject({ message: 'Location not found' });
    //                }
    //            });

    //    });

    //}

    //public GetTrailAsync = (id: string) => {

    //    var that = this;

    //    return new Promise<TrailDocument>((resolve, reject) => {

    //        var options: RequestOptions = {};
    //        var params: SqlParameter[] = [{ name: "@id", value: id }];

    //        var query: SqlQuerySpec = {
    //            query: "select * from heros where heros.id=@id",
    //            parameters: params
    //        };

    //        this._client.queryDocuments(this._config.trailsCollectionId, query)
    //            .toArray((error: QueryError, result: RetrievedDocument<TrailDocument>[]): void => {

    //                if (error) { reject(error); }

    //                if (result.length > 0) {
    //                    resolve(<TrailDocument>result[0]);
    //                }
    //                else {
    //                    reject({ message: 'Location not found' });
    //                }
    //            });

    //    });

    //}

    //public AddTrailAsync = (trail: TrailDocument) => {

    //    var that = this;

    //    return new Promise<TrailDocument>((resolve, reject) => {

    //        var options: RequestOptions = {};

    //        that._client.createDocument<TrailDocument>(that._config.trailsCollectionId, trail, options,
    //            (error: QueryError, resource: TrailDocument, responseHeaders: any): void => {
    //                if (error) {
    //                    reject(error);
    //                }
    //                resolve(resource);
    //            });

    //    });

    //}

    //public UpdateTrailAsync = (trail: TrailDocument) => {

    //    var that = this;

    //    return new Promise<TrailDocument>((resolve, reject) => {

    //        var options: RequestOptions = {};
    //        var documentLink = that._config.trailsCollectionId + '/docs/' + trail.id;

    //        that._client.replaceDocument<TrailDocument>(documentLink, trail, options,
    //            (error: QueryError, resource: TrailDocument, responseHeaders: any): void => {
    //                if (error) {
    //                    reject(error);
    //                }
    //                resolve(resource);
    //            });

    //    });

    //}

    //public DeleteTrailAsync = (id: string) => {

    //    var that = this;

    //    return new Promise<TrailDocument>((resolve, reject) => {

    //        var options: RequestOptions = {};
    //        var documentLink = that._config.trailsCollectionId + '/docs/' + id;

    //        that._client.deleteDocument(documentLink, options,
    //            (error: QueryError, resource: any, responseHeaders: any): void => {
    //                if (error) {
    //                    reject(error);
    //                }
    //                resolve(resource);
    //            });
    //    });

    //}

}