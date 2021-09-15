const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
router.use(express.json());
contest = [];
problems = [];
const url = "https://codeforces.com/api/contest.list?gym=false";
const data = fetch(url, {
  headers: {
    "content-type": "application/json",
  },
}).then((data) => {
  return data.json();
});

router.get("/home", async (req, res) => {
  data
    .then((actdat) => {
      res.send(actdat.result);
    })
    .catch((err) => res.send(err));
});
router.get("/user/:name", (req, res) => {
  const url =
    "https://codeforces.com/api/user.status?handle=" + req.params.name;
  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((jdata) => {
      console.log(jdata.result.length);
      filter = jdata.result.filter((data) => {
        if (data.verdict == "OK") return data;
      });

      res.send(filter);
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = router;
