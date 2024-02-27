const express = require("express");
const router = express.Router();

router.post("/unit", (req, res) => {
  let { unit } = req.body;
  let totalUnits = unit;
  let currentUnit = 0;
  let calculateKyats = [];
  let totalData = [];
  let totalKyats = 0;
  const calculateFun = (unit, perUnit, range) => {
    const calculateKyat = unit * perUnit;
    calculateKyats = [...calculateKyats, calculateKyat];
    const id = totalData.length + 1;
    totalData = [...totalData, { id, range, perUnit, calculateKyat }];
  };
  const sendHomeMeterBills = () => {
    totalKyats = calculateKyats.reduce((a, b) => a + b);
    res.status(202).json({
      totalKyats,
      totalUnits,
      totalData,
    });
  };

  if (unit > 500) {
    currentUnit = unit - 500;
    calculateFun(500, 125, "1-500");
    if (currentUnit > 4500) {
      currentUnit -= 4500;
      calculateFun(4500, 135, "501-5000");
      if (currentUnit > 5000) {
        currentUnit -= 5000;
        calculateFun(5000, 145, "5001-10000");
        if (currentUnit > 10000) {
          currentUnit -= 10000;
          calculateFun(10000, 155, "10001-20000");
          if (currentUnit > 30000) {
            currentUnit -= 30000;
            calculateFun(30000, 165, "20001-50000");
            if (currentUnit > 50000) {
              currentUnit -= 50000;
              calculateFun(50000, 175, "50001-100000");
              if (currentUnit > 0) {
                calculateFun(currentUnit, 180, "100001 and above");
                sendHomeMeterBills();
              }
            } else {
              calculateFun(currentUnit, 175, "50001-100000");
              sendHomeMeterBills();
            }
          } else {
            calculateFun(currentUnit, 165, "20001-50000");
            sendHomeMeterBills();
          }
        } else {
          calculateFun(currentUnit, 155, "10001-20000");
          sendHomeMeterBills();
        }
      } else {
        calculateFun(currentUnit, 145, "5001-10000");
        sendHomeMeterBills();
      }
    } else {
      calculateFun(currentUnit, 135, "501-5000");
      sendHomeMeterBills();
    }
  } else {
    const perUnit = 125;
    const calculateKyat = unit * perUnit;
    calculateKyats = [calculateKyat];
    const range = ["1-500"];
    const id = [1];
    totalKyats = calculateKyat;
    totalData = [...totalData, { id, range, perUnit, calculateKyat }];
    res.status(202).json({
      totalKyats,
      totalUnits,
      totalData,
    });
  }
});

router.post("/kyat", (req, res) => {
  let kyat = req.body.unit;
  let currentKyat = 0;
  let calculateUnits = [];
  let totalKyats = kyat;
  let totalUnits = 0;
  let totalData = [];
  const calculateFun = (kyat, perUnit, range) => {
    const calculateUnit = kyat / perUnit;
    const id = totalData.length + 1;
    calculateUnits = [...calculateUnits, calculateUnit];
    totalData = [...totalData, { id, range, kyat, perUnit }];
  };
  const sendHomeMeterBills = () => {
    totalUnits = calculateUnits.reduce((a, b) => a + b);
    res.status(202).json({ totalKyats, totalUnits, totalData });
  };

  if (kyat > 62500) {
    currentKyat = kyat - 62500;
    calculateFun(62500, 125, "1-500");
    if (currentKyat > 607500) {
      currentKyat -= 607500;
      calculateFun(607500, 135, "501-5000");
      if (currentKyat > 725000) {
        currentKyat -= 725000;
        calculateFun(725000, 145, "5001-10000");
        if (currentKyat > 1550000) {
          currentKyat -= 1550000;
          calculateFun(1550000, 155, "10001-20000");
          if (currentKyat > 4950000) {
            currentKyat -= 4950000;
            calculateFun(4950000, 165, "20001-50000");
            if (currentKyat > 8750000) {
              currentKyat -= 8750000;
              calculateFun(8750000, 175, "50001-100000");
              if (currentKyat > 0) {
                calculateFun(currentKyat, 180, "100001 and above");
                sendHomeMeterBills();
              }
            } else {
              calculateFun(currentKyat, 175, "50001-100000");
              sendHomeMeterBills();
            }
          } else {
            calculateFun(currentKyat, 165, "20001-50000");
            sendHomeMeterBills();
          }
        } else {
          calculateFun(currentKyat, 155, "10001-20000");
          sendHomeMeterBills();
        }
      } else {
        calculateFun(currentKyat, 145, "5001-10000");
        sendHomeMeterBills();
      }
    } else {
      calculateFun(currentKyat, 135, "501-5000");
      sendHomeMeterBills();
    }
  } else {
    const perUnit = 125;
    const totalKyats = kyat;
    const calculateUnit = kyat / perUnit;
    totalUnits = calculateUnit;
    const range = "1-500";
    const id = 1;
    totalData = [...totalData, { id, range, kyat, perUnit }];
    res.status(202).json({ totalData, totalKyats, totalUnits });
  }
});

module.exports = router;
