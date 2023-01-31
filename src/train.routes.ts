import * as express from "express";
import { collections } from "./database";

export const trainRouter = express.Router();
trainRouter.use(express.json());

trainRouter.get("/", async (_req, res) => {
    try {
        const trains = await collections.trains.find({}).toArray();
        res.status(200).send(trains);
    } catch (error) {
        res.status(500).send(error.message);
    }
 });

 trainRouter.get("/:id", async (req, res) => {
    try {
        //const date = new Date(req.params.date);
        const query = { train_name: { $eq: req.params.id } };
        const user = await collections.users.findOne({query});
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
 });