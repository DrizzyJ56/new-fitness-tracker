const BASE_URL = "https://fitnesstracker-s08a.onrender.com/api"

export const registerUserToDatabase = async (username, password) => {
    try {
        const response = await fetch(
          `${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username,
              password: password
          })
        });
        const result = await response.json();
        return result
      } catch (err) {
        console.error(err);
      }
}

export const loginUserToDatabase = async (username, password) =>{
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: username,
              password: password
          })
        });
        const result = await response.json();
        console.log(result);
        return result
      } catch (err) {
        console.error(err);
      }
}

export const RoutinesDatabase = async () => {
  try {
  const response = await fetch(`${BASE_URL}/routines`, {
    headers: {
    'Content-Type': 'application/json',
    },
  });
  
  const result = await response.json();
  return result
  } catch (err) {
  console.error(err);
  }
}

export const ActivitiesDatabase = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const getLoggedInUserFromDB = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const getUserRoutinesFromDB = async (username, token) => {

    try {
      const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const postRoutineToDB = async (token, name, goal, isPublic) => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
          goal: goal,
          isPublic: isPublic
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const editRoutineInDB = async (id, token, name, goal) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${id}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
          goal: goal
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const deleteRoutineFromDB = async (routineId,token) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
}

export const getActivitiesFromDB = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const attachActivityToRoutine = async (routineId, activityId, count, duration) => {
  try {
    const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activityId: activityId,
        count: count, 
        duration: duration
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const updateRoutineActivitiesInDB = async (routineActivityId, token, count, duration) => {
  try {
    const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
      method: "PATCH",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        count: count,
        duration: duration
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const removeActivityFromRoutine = async (routineActivityId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
      method: "DELETE",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const postActivityToDB = async (name, desc, token) => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        description: desc
      }) 
    });

    const result = await response.json();

    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const getUserPublicRoutinesFromDB = async (username) => {

  try {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

export const getRoutinesByActivityFromDB = async (activityId) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}
      
export const editActivityInDB = async (id, token, name, description) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${id}`, {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        description: description
      })
    });

      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
    console.error(err);
    }
}
   