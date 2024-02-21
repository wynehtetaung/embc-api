const express = require("express");
const router = express.Router();

router.post("/unit", (req, res) => {
  let { unit } = req.body;
  let totalUnits = unit;
  let currentUnit = 0;
  let perUnits = [];
  let Id = [];
  let calculateKyats = [];
  let ranges = [];
  let totalData = [];
  let totalKyats = 0;
  const calculateFun = (unit, perUnit, range) => {
    const calculateKyat = unit * perUnit;
    calculateKyats = [...calculateKyats, calculateKyat];
    totalData = [...totalData, { range, perUnit, calculateKyat }];
    perUnits = [...perUnits, perUnit];
    const id = Id.length + 1;
    Id = [...Id, id];
    ranges = [...ranges, range];
  };
  const sendHomeMeterBills = () => {
    totalKyats = calculateKyats.reduce((a, b) => a + b);
    res.status(202).json({
      Id,
      calculateKyats,
      perUnits,
      ranges,
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
    perUnits = [perUnit];
    calculateKyats = [calculateKyat];
    const range = ["1-500"];
    Id = [1];
    totalKyats = calculateKyat;
    totalData = [...totalData, { range, perUnit, calculateKyat }];
    res.status(202).json({
      Id,
      calculateKyats,
      perUnits,
      ranges,
      totalKyats,
      totalUnits,
      totalData,
    });
  }
});

router.post("/kyat", (req, res) => {
  let { kyats } = req.body;
  let currentKyat = 0;
  let perUnits = [];
  let calculateUnits = [];
  let totalUnits = 0;
  const calculateFun = (kyats, perUnit) => {
    const calculateKyat = kyats / perUnit;
    calculateUnits = [...calculateUnits, calculateKyat];
    perUnits = [...perUnits, perUnit];
  };
  const sendHomeMeterBills = () => {
    totalUnits = calculateUnits.reduce((a, b) => a + b);
    res.status(202).json({ calculateUnits, totalUnits, perUnits });
  };

  if (kyats > 62500) {
    currentKyat = kyats - 62500;
    calculateFun(62500, 125);
    if (currentKyat > 607500) {
      currentKyat -= 607500;
      calculateFun(607500, 135);
      if (currentKyat > 725000) {
        currentKyat -= 725000;
        calculateFun(725000, 145);
        if (currentKyat > 1550000) {
          currentKyat -= 1550000;
          calculateFun(1550000, 155);
          if (currentKyat > 4950000) {
            currentKyat -= 4950000;
            calculateFun(4950000, 165);
            if (currentKyat > 8750000) {
              currentKyat -= 8750000;
              calculateFun(8750000, 175);
              if (currentKyat > 0) {
                calculateFun(currentKyat, 180);
                sendHomeMeterBills();
              }
            } else {
              calculateFun(currentKyat, 175);
              sendHomeMeterBills();
            }
          } else {
            calculateFun(currentKyat, 165);
            sendHomeMeterBills();
          }
        } else {
          calculateFun(currentKyat, 155);
          sendHomeMeterBills();
        }
      } else {
        calculateFun(currentKyat, 145);
        sendHomeMeterBills();
      }
    } else {
      calculateFun(currentKyat, 135);
      sendHomeMeterBills();
    }
  } else {
    const perUnit = 125;
    const calculateKyat = kyats / perUnit;
    totalUnits = calculateKyat;
    res.status(202).json({ calculateKyat, totalUnits, perUnit });
  }
});

module.exports = router;
