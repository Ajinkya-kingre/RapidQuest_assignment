import mongoose from "mongoose";

const connectonDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`\nMongoDB connected DB:- ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}


export {connectonDB};