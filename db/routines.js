const client = require('./client');
const {attachActivitiesToRoutines} = require("./activities")

// *** addActivityToRoutine() from routine_activities.js needs to be completed before you can pass the tests in this file. 


// Work on this file FOURTH


// create and returns the new routine
// ** this function needs to be completed first because other tests rely on it. 
async function createRoutine({creatorId, isPublic, name, goal}) {
  try {
    const {rows: [routine]} = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES ($1, $2, $3, $4)
      RETURNING * ;
    `, [creatorId, isPublic, name, goal])
    return routine
  } catch (error) {
    throw error
  }
}



// this function returns an array of all of the routines with their activities attached. Use the helper function attachActivitiesToRoutines() from "db/activities" to help with this. 
async function getAllRoutines() {
  try {
    const {rows} = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId"=users.id;
    `)
    return attachActivitiesToRoutines(rows)
  } catch (error) {
    throw error
  }
}



// this function returns an array of all of the public routines with their activities attached. Use the helper function attachActivitiesToRoutines() from "db/activities" to help with this. 

async function getAllPublicRoutines() {
  try{
    const {rows} = await client.query(`
      SELECT routines.*, users.username AS "creatorName" FROM routines
      JOIN users ON routines."creatorId"=users.id
      WHERE routines."isPublic";
    `)
    return attachActivitiesToRoutines(rows)
  }catch(error){
    throw error
  }
}



// this function should return a single routine (object) from the database that matches the id that is passed in as an argument. 
async function getRoutineById(id){
  try{
    const {rows: [routine]} = await client.query(`
      SELECT * FROM routines
      WHERE id=$1;
    `,[id])
    return routine
  }catch(error){
    throw error
  }
}



// this function returns an array of all of the routines WITHOUT their activities attached.
async function getRoutinesWithoutActivities(){
  try{
    const {rows} = await client.query(`
      SELECT * FROM routines;
    `)
    return rows
  }catch(error){
    throw error
  }
}



// this function should return an array of routines, with their activities attached, where the creatorName matches the name that is passed in as part of the argument. Use the helper function attachActivitiesToRoutines() from "db/activities" to help with this. 
async function getAllRoutinesByUser({username}) {
  try{
    const {rows} = await client.query(`
      SELECT routines.*, users.username AS "creatorName" FROM routines
      JOIN users ON routines."creatorId"=users.id
      WHERE users.username=$1;
    `,[username])
    return attachActivitiesToRoutines(rows)
  }catch(error){
    throw error
  }
}



// this function should return an array of all public routines, with their activities attached, where the creatorName matches the name that is passed in as part of the argument. Use the helper function attachActivitiesToRoutines() from "db/activities" to help with this. 
async function getPublicRoutinesByUser({username}) {
  try{
    const {rows} = await client.query(`
      SELECT routines.*, users.username AS "creatorName" FROM routines
      JOIN users ON routines."creatorId"=users.id
      WHERE routines."isPublic" AND users.username=$1;
    `,[username])
    return attachActivitiesToRoutines(rows)
  }catch(error){
    throw error
  }
}



// this function should return an array of all routines, with their activities attached, contain the activity id that is passed in as part of the argument. Use the helper function attachActivitiesToRoutines() from "db/activities" to help with this. 
async function getPublicRoutinesByActivity({id}) {
  try{
    const {rows} = await client.query(`
      SELECT routines.*, users.username AS "creatorName" 
      FROM routines
      JOIN users ON routines."creatorId"=users.id
      JOIN routine_activities ON routine_activities."routineId"=routines.id
      WHERE routines."isPublic" AND routine_activities."activityId"=$1;
    `,[id])
    return attachActivitiesToRoutines(rows)
  }catch(error){
    throw error
  }
}



// The id should not be changed
// You should be able to update the name, or the goal, or the isPublic status, or any combination of these three. 
// return the updated routine
async function updateRoutine({id, ...fields}) {
  const setString = Object.keys(fields).map((key,idx) => `"${key}"=$${idx + 1}`).join(", ")
  try{
    if(setString.length){
      await client.query(`
        UPDATE routines
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,Object.values(fields))
    }
    return getRoutineById(id)
  }catch(error){
    throw error
  }
}



// this should remove a routine from the database based upon the id that is passed in as an argument
// Make sure to delete all the routine_activities whose routine is the one being deleted.
// you do not need to return anything
async function destroyRoutine(id) {
  try{
    await client.query(`
      DELETE FROM routine_activities
      WHERE "routineId"=${id};
      DELETE FROM routines
      WHERE id=${id};
    `)
  }catch(error){
    throw error
  }
}



module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
}