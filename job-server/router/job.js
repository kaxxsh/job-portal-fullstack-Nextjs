import express from "express";

import {getAllJobs,getJobs,createJob,updateJob,deleteJob} from "../controllers/JobController.js";

const Job = express.Router();

Job.route("/create").post(createJob);
Job.route("/get").get(getAllJobs);
Job.route("/get/:id").get(getJobs);
Job.route("/update/:id").patch(updateJob);
Job.route("/delete/:id").delete(deleteJob);

export default Job;