import app from "./app";
import dotenv from "dotenv";
dotenv.config();

app.listen(3334, () => {
  console.log("🚀 Server started on port 3333!");
});
