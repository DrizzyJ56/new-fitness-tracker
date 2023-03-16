const express = require("express");
const activitiesRouter = express.Router();

const {
  getAllActivities,
  getPublicRoutinesByActivity,
  createActivity,
  updateActivity,
} = require("../db/index");
const { requireUser } = require("./utils");

// GET /api/activities
activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

// GET /api/activities/:activityId/routines
activitiesRouter.get("/:id/routines", async (req, res, next) => {
  try {
    const { id } = req.params;
    const routines = await getPublicRoutinesByActivity({ id });
    if (routines.length) {
      res.send(routines);
    } else {
      next({
        name: "ActivityDoesNotExistError",
        message: "This activity does not exist",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/activities
activitiesRouter.post("/", requireUser, async (req, res, next) => {
  const info = req.body;
  try {
    if (info.name) {
      const activity = await createActivity(info);
      if (activity) {
        res.send(activity);
      }
    } else {
      next({
        name: "ActivityWithSameNameExistsError",
        message: "An activity with this name already exists",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PATCH /api/activities/:activityId
activitiesRouter.patch("/:id", requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const info = req.body;
    info.id = id;
    const updateAct = await updateActivity(info);
    if (updateAct) {
      res.send(updateAct);
    } else {
      next({
        name: "ActivityDoesNotExistError",
        message:
          "This activity id either does not exist, or an activity with this name exists",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activitiesRouter;
