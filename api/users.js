const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");

const {
  users,
  getUser,
  createUser,
  getUserByUsernameWithPassword,
  getPublicRoutinesByUser,
  getAllRoutinesByUser,
} = require("../db/index");
const { requireUser } = require("../api/utils");
// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "LoginERROR",
      message: "Invalid Username or Password",
    });
  }
  try {
    const user = await getUserByUsernameWithPassword(username);
    if (user && user.password == password) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET
      );
      res.send({
        token: token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or Password is incorrect",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const info = req.body;
  const username = info.username
  
  try {
    const doesUserExist = await getUserByUsernameWithPassword(username);
    if (doesUserExist) {
      next({
        name: "userAlreadyExistsError",
        message: "A user already exists with this information",
      });
    }
    if (info.password.length > 7) {
      const user = await createUser(info);

      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "Thank you for signing up!",
        token: token,
        user: user,
      });
    } else {
      next({
        name: "passwordTooShort",
        message: "Your password must be atleast 8 characters long",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/me
usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    if (!req.user) {
      next({
        name: "UserError",
        message: "Need to log in",
      });
    }
    res.send(req.user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/users/:username/routines
usersRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsernameWithPassword(username);
    if (!user) {
      next({
        name: "UserDoesNotExistError",
        message: "This user does not exist",
      });
    } else if (req.user && req.user.id === user.id) {
      const routines = await getAllRoutinesByUser(user);
      res.send(routines);
    } else {
      const routines = await getPublicRoutinesByUser(user);
      res.send(routines);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
