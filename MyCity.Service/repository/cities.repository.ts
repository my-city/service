import { DocumentClient, SqlQuerySpec, RequestCallback, QueryError, RequestOptions, SqlParameter, RetrievedDocument } from 'documentdb';
import { Config } from '../config';
import { DocumentdbUtils } from '../untils/documentdb.utils';
import { CityDocument } from '../models/city.document';

export class CitiesRepository {

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
        this.documentDbUtils = new DocumentdbUtils();
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

    public Find(querySpec, callback) {
        var self = this;
        self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);

            } else {
                callback(null, results);
            }
        });
    }

    public Get(itemId, callback) {
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


}