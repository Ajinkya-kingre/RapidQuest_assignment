import {Router} from "express"
import { repeatCustomersDaily, repeatCustomersMonthly, repeatCustomersQuaterly, repeatCustomersYearly } from "../controller/noOfRepeatCustomer.controller.js";


const router = Router();

router.route("/daily").get(repeatCustomersDaily);
router.route("/monthly").get(repeatCustomersMonthly);
router.route("/quater").get(repeatCustomersQuaterly);
router.route("/year").get(repeatCustomersYearly);

export default router;