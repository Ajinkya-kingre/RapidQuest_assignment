import { Router } from "express";
import {
  newCustomerDaily,
  newCustomerMonthly,
  newCustomerYearly,
} from "../controller/newCustomersOverTime.js";

const router = Router();

router.route("/daily").get(newCustomerDaily);
router.route("/monthly").get(newCustomerMonthly);
router.route("/yearly").get(newCustomerYearly);

export default router;
