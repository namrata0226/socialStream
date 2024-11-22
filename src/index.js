import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
});
connectDB();
const app = express();
app.listen(process.env.PORT, () => {
  console.log("App is running on http://localhost/" + process.env.PORT);
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
