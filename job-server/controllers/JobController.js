import Job from "../model/JobSchema.js";

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(200).json(jobs);
};
const getJobs = async (req, res) => {
  res.send("All Jobs");
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const createdJob = await Job.create(req.body);
  res.status(201).json(createdJob);
};

const updateJob = async (req, res) => {
  res.send("All Jobs");
};
const deleteJob = async (req, res) => {
  res.send("All Jobs");
};

export { getAllJobs, getJobs, createJob, updateJob, deleteJob };
