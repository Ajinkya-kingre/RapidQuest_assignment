import {Router} from "express";
import { dailySales } from "../controller/totalSalesOverTIme.controller.js";


const router = Router();

router.route("/test").get(dailySales);


export default router