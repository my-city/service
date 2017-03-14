import { DocumentClient, SqlQuerySpec, RequestCallback, QueryError, RequestOptions, SqlParameter, RetrievedDocument } from 'documentdb';
import { Promise } from 'promise';
import { Config } from '../config';
import { DocumentdbUtils } from '../untils/documentdb.utils';

export class TrailsRepository {

    private client: DocumentClient;
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

    public Add (item, callback) {
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

    public Update (itemId, callback) {
        var self = this;

        self.Find(itemId, function (err, doc) {
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

    public Get (itemId, callback) {
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