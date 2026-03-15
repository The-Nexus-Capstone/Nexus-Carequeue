const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const totalWaiting = await db.query(
      "SELECT COUNT(*) FROM queues WHERE status='waiting'"
    );

    const activeDoctors = await db.query(
      "SELECT COUNT(*) FROM clinics"
    );

    const avgWaitTime = 10;

 res.json({
  totalWaiting: Number(totalWaiting.rows[0].count),
  avgWaitTime: avgWaitTime,
  activeDoctors: Number(activeDoctors.rows[0].count)
});

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;