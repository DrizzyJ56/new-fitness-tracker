const BASE_URL = "https://fitnesstracker-s08a.onrender.com/api"

export const registerUser = async (username, password) => {
    try {
        const response = await fetch(
          `${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              username: username,
              password: password
            }
          })
        });
        const result = await response.json();
        console.log(result)
        return result
      } catch (err) {
        console.error(err);
      }
}
