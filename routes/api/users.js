const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Users = require('../../models/Users');

//register
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is too short').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, username, avatar } = req.body;

    try {
      let user = await Users.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new Users({
        name,
        email,
        password,
        username,
        avatar,
      });

      await user.save();

      res.send('Registered Sucessfully');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  },
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let user = await Users.findOne({ email });

  if (!user) {
    res.status(400).json({ errors: [{ msg: 'Incorrect email or password' }] });
  }

  if (user.password === password) {
    res.json({ username: user.username });
  } else {
    res.send('Incorrect email or password');
  }
});

router.post('/add-new-friend', async (req, res) => {
  console.log(req.body);

  try {
    const docs = await Users.find({ _id: req.body.id });
    console.log(docs[0].friends);
    if (docs[0].friends.includes(req.body.username)) {
      docs[0].pull({ friends: req.body.username });
      res.send('Removed Friend');
    } else {
      await Users.updateOne(
        { _id: req.body.id },
        { $push: { friends: req.body.username } },
      );
      res.status(200).send('Added as a friend');
    }
  } catch (err) {
    // handle errors
  }

  // try {
  //   const docs = await Users.find({ _id: req.body.id });
  //   if (docs.friends.includes(req.body.username)) {
  //     console.log('if');
  //     docs.pull({ friends: req.body.username });
  //     res.send('Removed Friend');
  //   } else {
  //     console.log('else');
  //     await Users.updateOne(
  //       { _id: req.body.id },
  //       { $push: { friends: req.body.username } },
  //     );
  //     res.send('Added');
  //   }
  // } catch (err) {
  //   res.send(err);
  // }
});
module.exports = router;
