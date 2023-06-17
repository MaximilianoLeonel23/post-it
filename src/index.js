import app from "./app.js";
import { connectDB } from "./database.js";
import { PORT } from "./config.js";

const main = async () => {
  try {
    await connectDB();
    console.log("Connected to DB");
    app.listen(PORT);
    console.log("Server on port", PORT);
  } catch (error) {
    console.log(error);
  }
};

main();
