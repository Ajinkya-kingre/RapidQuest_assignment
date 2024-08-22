import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
  res.send("pp");
});

// routes
import salesRoutes from "./routes/totalSalesOverTime.routes.js";
import salesGrowthRateRoutes from "./routes/saleGrowthRate.routes.js";
import newCustormerRoutes from "./routes/newCustomersOverTime.routes.js";
import repeatcustomersRoutes from "./routes/noOfRepaetCustomer.routes.js";
import customerDistributionByCityRoutes from "./routes/customerDistributionByCity.routes.js";
import cltvByCohortsRoutes from "./routes/cltvByCohorts.routes.js";

app.use("/api/v1/sales", salesRoutes);
app.use("/api/v1/growthRate", salesGrowthRateRoutes);
app.use("/api/v1/newCustomers", newCustormerRoutes);
app.use("/api/v1/repeatCustomers", repeatcustomersRoutes);
app.use("/api/v1/customerDistributionData", customerDistributionByCityRoutes);
app.use("/api/v1/cltveByCohorts", cltvByCohortsRoutes);
export { app };
