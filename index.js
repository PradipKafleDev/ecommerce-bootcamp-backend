import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

///as soon as indexjs run idele way to connect to databse

// (async()=>{})() IFFI WITH ARROW FUNCTION
(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("DB CONNECTION SUCCESFULL");
    app.on("error", err => {
      console.log("Error:", err);
      throw err;
    });

    const onListening = () => {
      console.log(`Backend is listening at ${config.PORT}`);
    };

    app.listen(config.PORT, onListening);
  } catch (err) {
    console.log("ERROR: ", err);
    throw err;
  }
})();
