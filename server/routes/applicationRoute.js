import express from "express";

import authorisation from "../middleware/auth.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationController.js";
 
const router = express.Router();

router.route("/apply/:id").get(authorisation, applyJob);
router.route("/get").get(authorisation, getAppliedJobs);
router.route("/:id/applicants").get(authorisation, getApplicants);
router.route("/status/:id/update").post(authorisation, updateStatus);
 

export default router;
