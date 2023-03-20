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
