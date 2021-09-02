const express = require("express");
const Posts = require("../posts/posts-model");
const Users = require("./users-model");

const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Users.get().then((users) => {
    res.status(200).json(users);
  });
});

router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  const userInfo = req.body;
  Users.insert(userInfo)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body).then((user) => {
    res.status(200).json(user);
  });
});

router.delete("/:id", validateUserId, async (req, res, next) => {
  const currentUser = await Users.getById(req.params.id);
  try {
    await Users.remove(req.params.id);
    res.json(currentUser);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", validateUserId, async (req, res, next) => {
  const comments = await Users.getUserPosts(req.params.id);
  try {
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/posts",
  validateUserId,
  validatePost,
  async (req, res, next) => {
    const postInfo = { user_id: req.params.id, text: req.body.text };
    Posts.insert(postInfo)
      .then(() => {
        res.status(201).json(postInfo);
      })
      .catch(next);
  }
);

// eslint-disable-next-line
router.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something in users router!",
  });
});

module.exports = router;
