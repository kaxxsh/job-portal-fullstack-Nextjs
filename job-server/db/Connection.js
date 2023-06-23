import mongoose from "mongoose";

const dbConnection = (URL) =>{
    mongoose.connect(URL)
}

export default dbConnection;