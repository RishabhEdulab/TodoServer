import { jestDataSource } from "../auth/jest-setup";
import { AppDataSource } from "../auth/DataSource";
export const NewConnection = async () => {
  // Close the current connection

  await jestDataSource
    .initialize()
    .then(() => {
      console.log("jestdatabase is connect");
    })
    .catch((error) => console.log(error));
};
