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
    roundTrip: number;
    camping: boolean;  
    dogFriendly: boolean;
    publicTransit: boolean;
    images: {
        path: string,
        title: string
    }[];
    address: string;
    lang: number;
    alt: number;
    approvers: string[]; // email address of people who approved
 }