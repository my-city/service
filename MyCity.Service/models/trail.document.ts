import { NewDocument, RetrievedDocument } from 'documentdb';

export class TrailDocument implements NewDocument<TrailDocument>,
    RetrievedDocument<TrailDocument>{
    /* NewDocument Interface */
    id: string;

    /* RetrievedDocument Interface */
    _ts: string;
    _self: string;

    category: string; //ie: vancouver
    name: string;
    approved: boolean;
    description: string; // html
    rating: number;
    voteCount: number;
    region: string;    //ie: Tri-city
    difficulty: string;  // hard, medium, easy
    time: number;   // hours/minutes
    distance: number;  // ie: from Vanouver
    camping: boolean;  
    dogFriendly: boolean;
    publicTransit: boolean;
    mapImages: {
        path: string,
        title: string
    }[];
    images: {
        path: string,
        title: string
    }[];
    geoLocation: {
        address: string;
        coordinates: number[];
    };
    comments: {
        user: string,
        email: string,
        comment: string,
        images: {
            path: string,
            title: string
        }[];
    }[];
 }