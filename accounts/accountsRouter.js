const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  const sql = db("accounts").toString();
  console.log("Hello, here it is", sql);

  db("accounts")
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "yuhhhhh" });
    });
});

router.get("/:id", ({ params: { id } }, res) => {
  db("accounts")
    .where({ id })
    .then((account) => {
      if (account.length === 0) {
        res.status(404).json({ message: "404, sorry", status: account });
      }

      console.log(account);
      res.json(account);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "ER OR" });
    });
});

router.post("/", (req, res) => {
  const accountData = req.body;

  db("accounts")
    .insert(accountData)
    .then((succ) => {
      res.status(201).json({
        message: "You posted the account, I'm so proud",
        message2: `Your account ID is ${succ}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "ER OR" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const accountData = req.body;

  db("accounts")
    .update(accountData)
    .where({ id })
    .then((succ) => {
      res.status(200).json({
        message: "You updated the account, I'm so proud",
        message2: ` ${succ}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "ER OR" });
    });
});

router.delete("/:id", ({ params: { id } }, res) => {
  db("accounts")
    .where({ id })
    .del()
    .then((succ) => {
      res.status(200).json({
        message: "You deleted the account, I'm so proud",
        message2: ` ${succ}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "ER OR" });
    });
});

module.exports = router;
