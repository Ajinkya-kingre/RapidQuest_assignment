import {Router} from "express"
import { repeatCustomersDaily, repeatCustomersMonthly, repeatCustomersQuater, repeatCustomersYear } from "../controller/noOfRepeatCustomer.controller.js";


const router = Router();

router.route("/daily").get(repeatCustomersDaily);
router.route("/monthly").get(repeatCustomersMonthly);
router.route("/quater").get(repeatCustomersQuater);
router.route("/year").get(repeatCustomersYear);

export default router;