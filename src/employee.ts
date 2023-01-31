import * as mongodb from "mongodb";
 
export interface Employee {
   name: string;
   position: string;
   level: string;
   _id?: mongodb.ObjectId;
}