import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

const app = express();
dotenv.config({
  path: "./env",
});
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error:", err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running on http://localhost/" + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("MONGO DB Connection FAILED !!", err);
  });









































































  
// Another Way of Connecting database
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.log("Error:", err);
//       throw err;
//     });
//     app.listen(process.env.PORT, (res, req) => {
//       console.log("App is running on http://localhost/" + process.env.PORT);
//     });
//   } catch (err) {
//     console.log(`Error in database connection ${err}`);
//     throw err;
//   }
// })();
