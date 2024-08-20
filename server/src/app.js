import express from "express";
import cors from "cors"


const app = express();


app.use(
    cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
    })
)

app.use(express.json({limit : "16kb"}));   
app.use(express.urlencoded({extended : true, limit : "16kb"}))

app.get("/",(req, res) => {
    res.send("pp");
})

// routes
import salesRoutes from "./routes/totalSalesOverTime.routes.js"
app.use("/api/v1/sales", salesRoutes);

export {app};   