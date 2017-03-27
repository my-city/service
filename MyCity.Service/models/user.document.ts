import { NewDocument, RetrievedDocument } from 'documentdb';

export class UserDocument implements NewDocument<UserDocument>,
    RetrievedDocument<UserDocument>{
    /* NewDocument Interface */
    id: string;

    /* RetrievedDocument Interface */
    _ts: string;
    _self: string;

    google: {
        displayName: string;
        email: string;
        photoURL: string;
        providerId: string;
        uid: string;
    };
    provider: number;
    uid: string; 
 }