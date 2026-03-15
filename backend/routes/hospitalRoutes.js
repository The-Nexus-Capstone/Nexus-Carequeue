const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const hospitals = await db.query("SELECT * FROM clinics");
    res.json(hospitals.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;