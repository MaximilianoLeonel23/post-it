import app from "./app.js";
import { connectDB } from "./database.js";

const port = 4000;

const main = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");
    app.listen(port);
    console.log("Server on port", port);
  } catch (error) {
    console.log(error);
  }
};

main();
