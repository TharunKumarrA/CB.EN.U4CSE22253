import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import stockRoutes from "./routes/stockRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use("/api", stockRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running :)");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
