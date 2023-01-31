import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const reservationRouter = express.Router();
reservationRouter.use(express.json());

reservationRouter.post("/", async (req, res) => {
    try {
        const user = req.body;
        const result = await collections.reservations.insertOne(user);
  
        if (result.acknowledged) {
            res.status(201).send(`new reservation saved succefully: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new user.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 reservationRouter.get("/", async (_req, res) => {
    try {
        const reservations = await collections.reservations.find({}).toArray();
        res.status(200).send(reservations);
    } catch (error) {
        res.status(500).send(error.message);
    }
 });