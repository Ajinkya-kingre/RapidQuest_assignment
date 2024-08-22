import {Router} from "express";
import { customerDistributionByCity } from "../controller/customerDistributionByCity.controller.js";

const  router = Router();


    router.route("/city").get(customerDistributionByCity);

export default router