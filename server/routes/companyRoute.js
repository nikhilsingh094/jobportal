import express from "express"
import { getCompany, getCompanyById, register, updateCompany } from "../controllers/companyController.js";
import authorisation from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addCompany").post(authorisation,register);
router.route("/getCompany").get(authorisation,getCompany);
router.route("/getCompanyById/:id").get(authorisation,getCompanyById);
router.route("/updateCompany/:id").put(authorisation,singleUpload,updateCompany);

export default router
