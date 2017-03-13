import { DocumentClient, SqlQuerySpec, RequestCallback, QueryError, RequestOptions, SqlParameter, RetrievedDocument, Promise } from 'documentdb';
//import { Promise } from 'async';
import { Config } from '../config';
import { TrailDocument } from './TrailDocument';

export class TrailData {

    private _config: Config;
    private _client: DocumentClient;

    constructor() {

        this._config = new Config();
        this._client = new DocumentClient(this._config.host, { masterKey: this._config.authKey }, this._config.connectionPolicy);

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

            this._client.queryDocuments(this._config.collectionUrl, query)
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

            that._client.createDocument<TrailDocument>(that._config.collectionUrl, trail, options,
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
            var documentLink = that._config.collectionUrl + '/docs/' + trail.id;

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
            var documentLink = that._config.collectionUrl + '/docs/' + id;

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