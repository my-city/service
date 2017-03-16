import { NewDocument, RetrievedDocument } from 'documentdb';

export class CityDocument implements NewDocument<CityDocument>,
    RetrievedDocument<CityDocument>{
    /* NewDocument Interface */
    id: string;

    /* RetrievedDocument Interface */
    _ts: string;
    _self: string;

    country: string; 
    state: string;
    title: string;
    description: string;
    image: string;
    cols: number;
    rows: number;
    approved: boolean;
    rating: number;
    voteCount: number;
    images: {
        path: string,
        title: string
    }[];
 }