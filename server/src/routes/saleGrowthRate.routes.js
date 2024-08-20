import { Router } from "express";
import { salesGrowthOverMonths, salesGrowthOveryears } from "../controller/salesGrowthRateOverTime.js";


const router = Router();



// Sales Growth Over Time
router.route("/month").get(salesGrowthOverMonths);
router.route("/year").get(salesGrowthOveryears);


export default router