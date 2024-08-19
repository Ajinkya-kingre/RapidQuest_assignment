import {app} from "./app.js";
import { connectonDB } from "./db/index.js";
import dotenv from "dotenv";


dotenv.config({
    path : "./.env"
})


connectonDB()
.then(() => {
    app.listen(process.env.PORT || 8000, ()=>{
        console.log("server is runnig at port",process.env.PORT )
    })
})
.catch(
    (error) => {
        console.log(error.message)
    }
)

