import {Router} from "express"
import { repeatCustomersDaily } from "../controller/noOfRepeatCustomer.controller.js";


const router = Router();

router.route("/daily").get(repeatCustomersDaily);

export default router;