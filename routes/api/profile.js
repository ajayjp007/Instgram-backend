const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");

router.get("/", (req, res) => res.send("profile route"));

router.get("/get-all-users", (req, res) => {
  try {
    Users.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        res.json({ users: docs });
      }
    });
  } catch (err) {
    res.send(err);
  }
});

//friend req

// router.post("/add-friends", async (req, res) => {

//     const { email, emailId } = req.body

//     try {
//         await Users.updateOne({ emailId: emailId }, { $push: { friends: email} })
//         console.log(Users)
//         res.send("friend request sent!")

//     } catch (err) {
//         res.send(err)
//     }

// })

module.exports = router;
