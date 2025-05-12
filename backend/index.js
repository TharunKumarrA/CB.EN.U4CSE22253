import express from "express";
import stockRoutes from "./routes/stockRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", stockRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running :)");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
