import express from "express";
import {body} from 'express-validator';
import {updateUser,deleteAll, deleteOne, getAllUsers, login, signUp} from "../controllers/user-controller.js";
const router = express.Router();
//import upload from "../middlewares/uploads"


router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/getAllUsers").get(getAllUsers);
router.route("/deleteOne").delete(deleteOne);
router.route("/deleteAll").delete(deleteAll); //archive
router.route("/updateUser").put(updateUser);

export default router;