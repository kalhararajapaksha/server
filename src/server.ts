import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";
import { stationRouter } from "./station.routes";
import { trainRouter } from "./train.routes";
import { sheduleRouter } from "./shedule.routes";
 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { ATLAS_URI } = process.env;
 
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
 
connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = express();
       app.use(cors());
       app.use("/employees", employeeRouter)
       app.use("/stations", stationRouter)
       app.use("/trains", trainRouter)
       app.use("/shedules", sheduleRouter)
       const PORT=process.env.PORT || 4000;
       // start the Express server
       app.listen(PORT, () => {
           console.log(`Server running at http://localhost:5200...`);
       });
 
   })
   .catch(error => console.error(error));

   export const app = express()