import Express from "express";
import cros from "cors";
import dbConnection from "./db/Connection.js";
import {} from "dotenv/config.js";
import User from "./router/user.js";
import Job from "./router/job.js";
import auth from "./middleware/auth.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = Express();
app.use(Express.json());
app.use(cros());

app.use("/api/v1/User", User);
app.use("/api/v1/job",auth, Job);
app.use(errorHandlerMiddleware);

const connection = () => {
  try {
    dbConnection(process.env.MONGO_URL);
    app.listen(3001, (req, res) => {
      console.log("Server is running at port 3001");
    });
  } catch (error) {
    console.log("Error in connecting to DB", error);
  }
};

connection();
