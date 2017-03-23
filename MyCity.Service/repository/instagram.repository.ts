import { Config } from '../config';
import { InstagramDocument } from '../models/instagram.document';
import parser = require('rss-parser');

export class InstagramRepository {

    private rssFeedBaseUrl = "https://websta.me/rss/tag/";

    constructor() {    }

    public Find(hashTag, callback) {
        var self = this;
        parser.parseURL(this.rssFeedBaseUrl + hashTag, function (err, parsed) {
            if (err) {
                callback(err);

            } else {
                callback(null, parsed.feed.entries);
            }
        })
    }




}