const express = require('express');
const { getAllPublicRoutines, createRoutine, getRoutineById, updateRoutine, destroyRoutine, addActivityToRoutine } = require('../db');
const { requireUser } = require('./utils');
const routinesRouter = express.Router();

// GET /api/routines
routinesRouter.get('/', async (req,res,next) => {
    try{
        const result = await getAllPublicRoutines()
        res.send(result)
    }catch({name, message}){
        next({name, message})
    }
})

// POST /api/routines
routinesRouter.post('/', requireUser, async (req,res,next) => {
    try{
        const info = req.body
        if(req.user.id){
            info.creatorId = req.user.id
            const result = await createRoutine(info)
            res.send(result)
        }
    }catch({name, message}){
        next({name, message})
    }
})
// PATCH /api/routines/:routineId
routinesRouter.patch('/:id', requireUser, async (req,res,next) => {
    try{
        const info = req.body
        const {id} = req.params
        info.id = id
        const routine = await getRoutineById(id)
        if(routine.creatorId === req.user.id){
            const result = await updateRoutine(info)
            res.send(info)
        }else{
            next({
                name: "UserError",
                message: "This post does not belong to you."
            })
        }
    }catch({name, message}){
        next({name, message})
    }
})
// DELETE /api/routines/:routineId
routinesRouter.delete('/:id', requireUser, async (req,res,next) => {
    try{
        const {id} = req.params
        const routine = await getRoutineById(id)
        if(!routine){
            next({
                name: "DatabaseError",
                message: "Routine does not exist!"
            })
        }else if(routine.creatorId === req.user.id){
            await destroyRoutine(id)
            res.send(routine)
        }else{
            next({
                name: "UserError",
                message: "This Post does not belong to you."
            })
        }
    }catch({name, message}){
        next({name, message})
    }
})

// POST /api/routines/:routineId/activities
routinesRouter.post('/:id/activities', async (req,res,next) => {
    try{
        const info = req.body
        const {id} = req.params
        info.routineId = id
        const result = await addActivityToRoutine(info)
        res.send(result)
    }catch({name, message}){
        next({name, message})
    }
})

module.exports = routinesRouter;
