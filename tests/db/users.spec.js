/* 

DO NOT CHANGE THIS FILE

*/

require("dotenv").config()
const bcrypt = require("bcrypt");
const client = require("../../db/client");

const {
  getUserById,
  createUser,
  getUser,
} = require("../../db");

describe("DB Users", ()=>{
  describe("createUser({ username, password })", () => {

    it("Creates the user", async () => {
      const fakeUserData = {
        username: "Horace",
        password: '12345678',
      };

      const user = await createUser(fakeUserData);

      expect(user.username).toBe(fakeUserData.username);
    });

    it("Does NOT return the password", async () => {
      const fakeUserData = {
        username: "HoraceTheSecond",
        password: '12345678',
      };
      const user = await createUser(fakeUserData);
      expect(user.password).toBeFalsy();
    });

    it("EXTRA CREDIT: Does not store plaintext password in the database", async () => {
      const fakeUserData = {
        username: "Harry",
        password: "superSecretPassword",
      };
      const user = await createUser(fakeUserData);
      expect(user.password).not.toBe(fakeUserData.password);
    });

    it("EXTRA CREDIT: Hashes the password (salted 10 times) before storing it to the database", async () => {
      const fakeUserData = {
        username: "Nicky",
        password: "extraSuperSecretPassword",
      };
      const user = await createUser(fakeUserData);

      const { rows: [queriedUser] } = await client.query(
        `
        SELECT * from users
        WHERE id = $1
        `,
        [user.id]
      );

      const hashedVersion = await bcrypt.compare(
        fakeUserData.password,
        queriedUser.password
      );
      expect(hashedVersion).toBe(true);
    });
  });
})

