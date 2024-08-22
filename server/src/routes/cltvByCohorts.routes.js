import { Router } from "express";
import { cltvByCohortMonth, cltvByCohortYear } from "../controller/cltvByCohorts.controller.js";

const router = Router();

router.route("/month").get(cltvByCohortMonth);
router.route("/year").get(cltvByCohortYear);

export default router;
