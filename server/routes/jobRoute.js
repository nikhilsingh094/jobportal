import express from "express";
import authorisation from "../middleware/auth.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController.js";



const router = express.Router();

router.route("/post").post(authorisation, postJob);
router.route("/get").get(authorisation, getAllJobs);
router.route("/getadminjobs").get(authorisation, getAdminJobs);
router.route("/get/:id").get(authorisation, getJobById);

export default router;
