const Users = require("../users/users-model");

function logger(req, res, next) {
  const time = new Date();
  console.log(`Request: '${req.method}', URL: '${req.url}' at ${time} `);
  next();
}

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then((possibleUser) => {
      if (possibleUser) {
        req.user = possibleUser;
        next();
      } else {
        next({ message: "not found", status: 404 });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    next({ status: 400, message: "missing required name field" });
  } else {
    next()
  }
}

function validatePost(req, res, next) {
}

module.exports = { logger, validateUserId, validateUser, validatePost };
