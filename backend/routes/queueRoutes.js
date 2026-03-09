const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const clinic_id = req.body?.clinic_id;

if (!clinic_id) {
  return res.status(400).json({ message: "clinic_id is required" });
}
    const user_id = req.user.id;

    await db.query(
      "INSERT INTO queues (user_id, clinic_id, status) VALUES ($1,$2,$3)",
      [user_id, clinic_id, "waiting"]
    );

    res.json({ message: "Joined queue" });
  } catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM queues");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;