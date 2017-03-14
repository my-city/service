import { NewDocument, RetrievedDocument } from 'documentdb';

export class AttractionDocument implements NewDocument<AttractionDocument>,
    RetrievedDocument<TrailDocument> {
    /* NewDocument Interface */
    id: string;

    /* RetrievedDocument Interface */
    _ts: string;
    _self: string;

    name: string; // ie: Trails
    approved: boolean;
    description: string; // html
    rating: number;
    voteCount: number;
 }