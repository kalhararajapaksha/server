import {beforeAll, describe, it} from "@jest/globals";
import request from "supertest";
import {app} from "../src/server";
import {connectToDatabase} from "../src/database";

describe("User login and singUp test", () => {

    beforeAll(async () => {
        await connectToDatabase("mongodb+srv://cluster1mean:vrU1YqaDsTccrgAJ@cluster0.lvh58gt.mongodb.net/?retryWrites=true&w=majority")
    })

    it("user login", function (done) {
        request(app)
            .post("/Users/loginn")
            .send({username: "wani", password: "wani"})
            .set("Accept", "application/json")
            // .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                console.log(res.body)
                return done();
            });
    });

});
