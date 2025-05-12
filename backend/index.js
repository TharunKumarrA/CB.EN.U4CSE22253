const express = require("express");
const app = express();

const stockRoutes = require("./routes/stockRoutes");

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", stockRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running :)");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
