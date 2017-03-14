import { NewDocument, RetrievedDocument } from 'documentdb';

export class TrailDocument implements NewDocument<TrailDocument>,
    RetrievedDocument<TrailDocument>{
    /* NewDocument Interface */
    id: string;

    /* RetrievedDocument Interface */
    _ts: string;
    _self: string;

    name: string;
    rating: number;
    region: string;
    difficulty: string;
    time: number;
    distance: number;
    camping: boolean;
    dogFriendly: boolean;
    publicTransit: boolean;
    image: {
        path: string,
        title: string
    };
    geoLocation: {
        type: string;
        coordinates: number[];
    }

}