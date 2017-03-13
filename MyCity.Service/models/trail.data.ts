import { DocumentClient, SqlQuerySpec, RequestCallback, QueryError, RequestOptions, SqlParameter, RetrievedDocument } from 'documentdb';
import { Promise } from 'promise';
import { Config } from '../config';
import { TrailDocument } from './trail.document';

export class TrailData {

    private _config: Config;
    private _client: DocumentClient;

    constructor() {

        this._config = new Config();
        this._client = new DocumentClient(this._config.host, { masterKey: this._config.authKey }, this._config.databaseId);

    }

    public GetTrailsAsync = () => {

        var that = this;

        return new Promise<TrailDocument>((resolve, reject) => {

            var options: RequestOptions = {};
            var params: SqlParameter[] = [];

            var query: SqlQuerySpec = {
                query: "select * from trails",
                parameters: params
            };

            this._client.queryDocuments(this._config.trailsCollectionId, query)
                .toArray((error: QueryError, result: RetrievedDocument<TrailDocument>[]): void => {

                    if (error) { reject(error); }

                    if (result.length > 0) {
                        resolve(<Array<TrailDocument>>result);
                    }
                    else {
                        reject({ message: 'Location not found' });
                    }
                });

        });

    }

    public GetTrailAsync = (id: string) => {

        var that = this;

        return new Promise<TrailDocument>((resolve, reject) => {

            var options: RequestOptions = {};
            var params: SqlParameter[] = [{ name: "@id", value: id }];

            var query: SqlQuerySpec = {
                query: "select * from heros where heros.id=@id",
                parameters: params
            };

            this._client.queryDocuments(this._config.trailsCollectionId, query)
                .toArray((error: QueryError, result: RetrievedDocument<TrailDocument>[]): void => {

                    if (error) { reject(error); }

                    if (result.length > 0) {
                        resolve(<TrailDocument>result[0]);
                    }
                    else {
                        reject({ message: 'Location not found' });
                    }
                });

        });

    }

    public AddTrailAsync = (trail: TrailDocument) => {

        var that = this;

        return new Promise<TrailDocument>((resolve, reject) => {

            var options: RequestOptions = {};

            that._client.createDocument<TrailDocument>(that._config.trailsCollectionId, trail, options,
                (error: QueryError, resource: TrailDocument, responseHeaders: any): void => {
                    if (error) {
                        reject(error);
                    }
                    resolve(resource);
                });

        });

    }

    public UpdateTrailAsync = (trail: TrailDocument) => {

        var that = this;

        return new Promise<TrailDocument>((resolve, reject) => {

            var options: RequestOptions = {};
            var documentLink = that._config.trailsCollectionId + '/docs/' + trail.id;

            that._client.replaceDocument<TrailDocument>(documentLink, trail, options,
                (error: QueryError, resource: TrailDocument, responseHeaders: any): void => {
                    if (error) {
                        reject(error);
                    }
                    resolve(resource);
                });

        });

    }

    public DeleteTrailAsync = (id: string) => {

        var that = this;

        return new Promise<TrailDocument>((resolve, reject) => {

            var options: RequestOptions = {};
            var documentLink = that._config.trailsCollectionId + '/docs/' + id;

            that._client.deleteDocument(documentLink, options,
                (error: QueryError, resource: any, responseHeaders: any): void => {
                    if (error) {
                        reject(error);
                    }
                    resolve(resource);
                });
        });

    }

}