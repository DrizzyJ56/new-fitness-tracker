const client = require("./client");

// Work on addActivityToRoutine THIRD, then work on routines.js

// adds an activity to the routine_activity table
// ** this function needs to be completed first because other tests rely on it.
async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
      INSERT INTO routine_activities ("routineId", "activityId", count, duration)
      VALUES ($1, $2, $3, $4)
      RETURNING * ;
    `,
      [routineId, activityId, count, duration]
    );
    client.release()
    return routineActivity;
  } catch (error) {
    throw error;
  }
}

// Work on the remainder of this file FIFTH

// this function should return a single routine_activity (object) from the database that matches the id that is passed in as an argument.
async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT * 
        FROM routine_activities
        WHERE id=$1
      `,
      [id]
    );
    client.release()
    return routine;
  } catch (error) {
    throw error;
  }
}

// this function should return an array of routine_activity objects that are attached to the routine id that is passed in as part of the argument.
async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM routine_activities
        WHERE "routineId" = $1
      `,
      [id]
    );
    client.release()
    return rows;
  } catch (error) {
    throw error;
  }
}

// The id should not be changed
// You should be able to update the count, or the duration, or count & duration.
// return the updated routine_activity
async function updateRoutineActivity({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  try {
    if (setString.length) {
      await client.query(
        `
          UPDATE routine_activities
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
        `,
        Object.values(fields)
      );
      client.release()
      return getRoutineActivityById(id);
    }
  } catch (error) {
    throw error;
  }
}

// this should remove a routine_activity from the database based upon the id that is passed in as an argument
// you should return the routine_activity that was deleted
async function destroyRoutineActivity(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(`
      DELETE FROM routine_activities
      WHERE id=${id}
      RETURNING *;
    `);
    client.release()
    return routine;
  } catch (error) {
    throw error;
  }
}

// check if the userId that is passed in as an argument matches the id of the user who created the routine_activity (the id was also passed into the function as an argument).
// if the user created the routine_activity then return true, otherwise return false.
async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT routine_activities.*, routines."creatorId"
        FROM routine_activities
        JOIN routines ON routine_activities."routineId"=routines.id
        WHERE routine_activities.id=$1 AND routines."creatorId"=$2;
      `,
      [routineActivityId, userId]
    );
    if (routine?.creatorId === userId) {
      return true;
    }
    client.release()
    return false;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
