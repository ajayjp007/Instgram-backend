const Posts = require('../../models/Post');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('posts route'));

router.post('/add-post', async (req, res) => {
  const {
    name,
    email,
    caption,
    imageURL,
    uploadedDate,
    like,
    comment,
    numberOfLikes,
  } = req.body;

  const post = new Posts({
    name,
    email,
    caption,
    imageURL,
    uploadedDate,
    like,
    comment,
    numberOfLikes,
  });
  console.log(post, req.body);

  try {
    await post.save();
    res.send('Posted!');
  } catch (err) {
    res.status(500).send('server error');
  }
});

router.post('/user-posts', (req, res) => {
  try {
    Posts.find({ email: req.body.email }, (err, docs) => {
      console.log(req.body.email);
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
        res.json({ posts: docs });
      }
    });
  } catch (err) {
    res.send(err);
  }
});

router.get('/get-all-posts', (req, res) => {
  try {
    Posts.find({}, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        docs.reverse();
        res.json({ posts: docs });
      }
    });
  } catch (err) {
    res.send(err);
  }
});

router.post('/add-new-comments', async (req, res) => {
  try {
    await Posts.updateOne(
      { _id: req.body.id },
      { $push: { comment: req.body.comment } },
    );
    res.send('updated!');
  } catch (err) {
    res.send(err);
  }
});

router.post('/add-likes', async (req, res) => {
  try {
    const docs = await Posts.findById(req.body.id);
    console.log(docs.like.includes(req.body.username));
    if (docs.like.includes(req.body.username)) {
      docs.like.pull({ like: req.body.username });
      res.send('unliked');
    } else {
      await Posts.updateOne(
        { _id: req.body._id },
        { $push: { like: req.body.username } },
      );
      res.send('liked');
    }
  } catch (err) {
    res.send(err);
  }
});

// Send post id in order to delete the comment
router.post('/delete-post', async (req, res) => {
  try {
    Posts.findOneAndDelete({ _id: req.body.id }, (err, docs) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send('Post Deleted');
        console.log('Post Deleted');
      }
    });
  } catch (err) {
    res.send(err);
  }
});

router.post('/delete-comments', async (req, res) => {
  try {
    console.log(req.body);
    await Posts.comment.findById({ _id: req.body.id });
    console.log('delte');
    // await Posts.comment.findOneById(, (docs, err) => {
    //   console.log(docs);
    // });

    // console.log(req.body._id);

    //  Posts.comments.findby({ id: req.body._id }, (err, docs) => {
    //   console.log(docs);
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('Comment Deleted');
    //   }
    // });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
