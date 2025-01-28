import express from "express"
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import authorisation from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(authorisation,singleUpload,updateProfile)


export default router