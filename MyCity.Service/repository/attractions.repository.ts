import { DocumentClient, SqlQuerySpec, RequestCallback, QueryError, RequestOptions, SqlParameter, RetrievedDocument } from 'documentdb';
import { Config } from '../config';
import { DocumentdbUtils } from '../untils/documentdb.utils';
import { AttractionDocument } from '../models/attraction.document';

export class AttractionsRepository {

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

    }

    public Find(querySpec, callback) {
        var attractions = [
            { name: "Trails", approved: true },
            { name: "Parks", approved: true },
        ];
        callback(null, attractions);
    }


}