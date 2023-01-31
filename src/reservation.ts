import * as mongodb from "mongodb";
 
export interface Reservation {
    userID: string;
    seats: string[];
    date:string;
    trainTime?:string;
    trainID: string;
    total:string;
    _id?: mongodb.ObjectId;
 }