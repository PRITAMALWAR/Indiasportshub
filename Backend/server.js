require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const matchRoutes = require("./routes/matches.routes");

const app = express();

// connect MongoDB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/matches", matchRoutes);



// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
