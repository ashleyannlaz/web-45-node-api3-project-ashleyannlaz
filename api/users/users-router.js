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

router.post("/", validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// eslint-disable-next-line
router.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Something in users router!",
  });
});

module.exports = router;
