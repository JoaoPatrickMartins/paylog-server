import mongoose from "mongoose";

import config from "../config/database"

class Database {
    constructor(){
        this.connection = mongoose.connect(
            config.url,
        );

        const db = mongoose.connection;
        db.on("error", (error) => console.error(error));
        db.once("open", () => console.log("📦 connected to the database!"));
    }
}

export default new Database();