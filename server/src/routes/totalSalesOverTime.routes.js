import {Router} from "express";
import { dailySales, monthlySales, quarterlySales, yearlySales } from "../controller/totalSalesOverTIme.controller.js";


const router = Router();
// 
router.route("/dailySales").get(dailySales);
router.route("/monthlySales").get(monthlySales);
router.route("/querterlySales").get(quarterlySales);
router.route("/yearlySales").get(yearlySales);


export default router