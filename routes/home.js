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
    const id = totalData.length + 1;
    calculateKyats = [...calculateKyats, calculateKyat];
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

  if (unit > 30) {
    currentUnit = unit - 30;
    calculateFun(30, 35, "1-30");
    if (currentUnit > 20) {
      currentUnit -= 20;
      calculateFun(20, 50, "31-50");
      if (currentUnit > 25) {
        currentUnit -= 25;
        calculateFun(25, 70, "51-75");
        if (currentUnit > 25) {
          currentUnit -= 25;
          calculateFun(25, 90, "76-100");
          if (currentUnit > 50) {
            currentUnit -= 50;
            calculateFun(50, 110, "101-150");
            if (currentUnit > 50) {
              currentUnit -= 50;
              calculateFun(50, 120, "151-200");
              if (currentUnit > 0) {
                calculateFun(currentUnit, 125, "201 and above");
                sendHomeMeterBills();
              }
            } else {
              calculateFun(currentUnit, 120, "151-200");
              sendHomeMeterBills();
            }
          } else {
            calculateFun(currentUnit, 110, "101-150");
            sendHomeMeterBills();
          }
        } else {
          calculateFun(currentUnit, 90, "76-100");
          sendHomeMeterBills();
        }
      } else {
        calculateFun(currentUnit, 70, "51-75");
        sendHomeMeterBills();
      }
    } else {
      calculateFun(currentUnit, 50, "31-50");
      sendHomeMeterBills();
    }
  } else {
    const perUnit = 35;
    const calculateKyat = unit * perUnit;
    totalKyats = calculateKyat;
    const range = ["1-30"];
    const id = [1];
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

  if (kyat > 1050) {
    currentKyat = kyat - 1050;
    calculateFun(1050, 35, "1-30");
    if (currentKyat > 1000) {
      currentKyat -= 1000;
      calculateFun(1000, 50, "31-50");
      if (currentKyat > 1750) {
        currentKyat -= 1750;
        calculateFun(1750, 70, "51-75");
        if (currentKyat > 2250) {
          currentKyat -= 2250;
          calculateFun(2250, 90, "76-100");
          if (currentKyat > 5500) {
            currentKyat -= 5500;
            calculateFun(5500, 110, "101-150");
            if (currentKyat > 6000) {
              currentKyat -= 6000;
              calculateFun(6000, 120, "151-200");
              if (currentKyat > 0) {
                calculateFun(currentKyat, 125, "201 and above");
                sendHomeMeterBills();
              }
            } else {
              calculateFun(currentKyat, 120, "151-200");
              sendHomeMeterBills();
            }
          } else {
            calculateFun(currentKyat, 110, "101-150");
            sendHomeMeterBills();
          }
        } else {
          calculateFun(currentKyat, 90, "76-100");
          sendHomeMeterBills();
        }
      } else {
        calculateFun(currentKyat, 70, "51-75");
        sendHomeMeterBills();
      }
    } else {
      calculateFun(currentKyat, 50, "31-50");
      sendHomeMeterBills();
    }
  } else {
    const perUnit = 35;
    const totalKyats = kyat;
    const calculateUnit = kyat / perUnit;
    totalUnits = calculateUnit;
    const range = "1-30";
    const id = 1;
    totalData = [...totalData, { id, range, kyat, perUnit }];
    res.status(202).json({ totalData, totalKyats, totalUnits });
  }
});

module.exports = router;
