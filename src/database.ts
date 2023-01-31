import * as mongodb from "mongodb";
import { Employee } from "./employee";
import { Station } from "./Station";
import { Train } from "./train";
import { Shedule } from "./shedule";
import {User} from "./user";
import {Reservation} from "./reservation";
 
export const collections: {
   employees?: mongodb.Collection<Employee>;
   stations?: mongodb.Collection<Station>;
   trains?: mongodb.Collection<Train>;
   shedules?: mongodb.Collection<Shedule>;
   users?: mongodb.Collection<User>;
   reservations?: mongodb.Collection<Reservation>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("meanStackExample");
   await applySchemaValidation(db);
 
   const employeesCollection = db.collection<Employee>("employees");
   const stationsCollection = db.collection<Station>("station");
   const trainCollection = db.collection<Train>("train");
   const sheduleCollection = db.collection<Shedule>("shedule");
   const usersCollection = db.collection<User>("users");
   const reservationCollection = db.collection<Reservation>("reservations");
   collections.users = usersCollection;
   collections.employees = employeesCollection;
   collections.stations = stationsCollection;
   collections.trains = trainCollection;
   collections.shedules = sheduleCollection;
   collections.reservations = reservationCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["name", "position"],
           additionalProperties: false,
           properties: {
               _id: {},
               name: {
                   bsonType: "string",
                   description: "'name' is required and is a string",
               },
               position: {
                   bsonType: "string",
                   description: "'position' is required and is a string",
               },
           },
       },
   };


 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "employees",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("employees", {validator: jsonSchema});
       }
   });

   const userjsonSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["name", "username", "email" , "password"],
        additionalProperties: false,
        properties: {
            _id: {},
            name: {
                bsonType: "string",
                description: "'name' is required and is a string",
            },
            username: {
                bsonType: "string",
                description: "'username' is required and is a string",
            },
            email: {
                bsonType: "string",
                description: "'email' is required and is ",
                
            },
            password: {
                bsonType: "string",
                description: "'password' is required and is ",
                
            },
        },
    },
   };

   await db.command({
    collMod: "users",
    validator: userjsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection("users", {validator: userjsonSchema});
    }
  });

  const reservationSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["userID", "trainID"],
        additionalProperties: false,
        properties: {
            _id: {},
            date: {},
            total: {},
            seats: {},
            trainTime:{},
            userID: {
                bsonType: "string",
                description: "'name' is required and is a string",
            },
            trainID: {
                bsonType: "string",
                description: "'train id' is required and is a string",
                minLength: 5
            }
        },
    },
};


await db.command({
    collMod: "reservations",
    validator: reservationSchema
   }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection("reservations", {validator: reservationSchema});
    }
  });
}