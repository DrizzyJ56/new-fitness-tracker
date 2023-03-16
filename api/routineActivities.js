const express = require("express");
const {
  getRoutineActivityById,
  getRoutineById,
  updateRoutineActivity,
  destroyRoutineActivity,
} = require("../db");
const routineActivitiesRouter = express.Router();
const { requireUser } = require("./utils");

// PATCH /api/routine_activities/:routineActivityId
routineActivitiesRouter.patch("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  const info = req.body;
  info.id = id;
  try {
    const routineActivity = await getRoutineActivityById(id);
    const routine = await getRoutineById(routineActivity.routineId);
    if (!routine) {
      next({
        name: "NoRoutineExistsError",
        message: "This routineActivityId is not attached to a routine",
      });
    } else if (routine.creatorId === req.user.id) {
      const result = await updateRoutineActivity(info);
      res.send(result);
    } else {
      next({
        name: "YouAreNotTheOwnerError",
        message: "You did not create the routine attached",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/routine_activities/:routineActivityId
routineActivitiesRouter.delete("/:id", requireUser, async (req, res, next) => {
  const { id } = req.params;
  try {
    const routineActivity = await getRoutineActivityById(id);
    const routine = await getRoutineById(routineActivity.routineId);
    if (!routine) {
      next({
        name: "NoRoutineExistsError",
        message: "This routineActivityId is not attached to a routine",
      });
    } else if (routine.creatorId === req.user.id) {
      await destroyRoutineActivity(id);
      res.send(routineActivity);
    } else {
      next({
        name: "YouAreNotTheOwnerError",
        message: "You did not create the routine attached",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = routineActivitiesRouter;
