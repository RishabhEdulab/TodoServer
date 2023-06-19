import request from "supertest";
import index from "../../src/index";

import { testInitialize } from "../../src/index";
import { jestDataSource } from "../../src/auth/jest-setup";
import { testDatasource } from "../../src/controllers/todo";
import { AppDataSource } from "../../src/auth/DataSource";

console.log("user.routes.test");

describe("API Tests", () => {
  beforeAll(async () => {
    //pass daatsource to todo controller
    testDatasource("jest");
    testInitialize("jest");
    //close datasource
  });

  test("should return a 201", async () => {
    const postdata = {
      name: "mahesh",
      email: "mahesh@edulab.in",
      password: "123456789",
      age: "23",
      gender: "male",
    };

    const res = await request(index).post("/Employees/Insert").send(postdata);
    expect(res.statusCode).toBe(201);
  });

  test("it return a all product data", async () => {
    const res = await request(index).get("/Employees/Get");
    expect(res.statusCode).toBe(200);
  });
  test("should return a 200 and Data is updated", async () => {
    const postdata = {
      id: "648c68601c776784d5458af8",
      name: "jestnames",
      email: "jestemails",
      password: "jestpasswords",
      age: "jestages",
      gender: "jestgenders",
    };
    const res = await request(index).put("/Employees/Update").send(postdata);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toEqual("Data Is Updated");
  });

  test("should return a 200 and Data is deleted",async()=>{
    const deleteId = "648c6a6f9b38e7de37e46176";

        const res = await request(index).delete(`/Employees/Delete?id=${deleteId}`);
        console.log(res.body);
    
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual("Data is Deleted");
  })
  afterAll(() => {});
});
