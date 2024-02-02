import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(){
    const mongo_uri = process.env.MONGO_URI;

    mongoose.connect(mongo_uri)
    .then(()=>console.log("Database connection successful!"))
    .catch((err)=>console.log(err));
}

export default connect;