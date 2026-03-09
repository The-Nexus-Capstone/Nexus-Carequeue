require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("CareQueue API is running 🚀");
});

// ROUTES
const authRoutes = require("./routes/authRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const queueRoutes = require("./routes/queueRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/queues", queueRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});