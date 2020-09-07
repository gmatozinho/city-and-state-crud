const request = require("supertest");
const { app } = require("../app");
const { city } = require("../db");
jest.mock("../db");

describe("Post Endpoint", () => {
  it("should create city with sucess", async () => {
    city.create.mockResolvedValue({
      _id: "5f4ebec508c5f94b10854888",
      name: "Amazonas",
      stateId: "5f4ebec508c5f94b10854886",
      createdAt: "2020-09-01T21:36:05.288Z",
      updatedAt: "2020-09-01T21:36:05.288Z",
      __v: 0,
    });

    const body = {
      name: "Amazonas",
      stateId: "5f4ebec508c5f94b10854886",
    };

    const res = await request(app)
      .post("/city")
      .set("x-api-key", "test")
      .send(body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("stateId");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
    expect(res.body).toHaveProperty("__v");
  });

  it("dont should create a new city with invalid body", async () => {
    city.create.mockImplementation(() => {
      throw new Error("Test error");
    });
    const body = {};

    const res = await request(app)
      .post("/city")
      .set("x-api-key", "test")
      .send(body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("dont should create a new city without x-api-key", async () => {
    const body = {};

    const res = await request(app).post("/city").send(body);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

describe("Patch Endpoint", () => {
  it("should update city with sucess", async () => {
    city.update.mockResolvedValue({
      _id: "5f4ebec508c5f94b10854888",
      name: "Amazonas",
      stateId: "5f4ebec508c5f94b10854886",
      createdAt: "2020-09-01T21:36:05.288Z",
      updatedAt: "2020-09-01T21:36:05.288Z",
      __v: 0,
    });

    const body = {
      name: "Amazonas",
    };

    const res = await request(app)
      .patch("/city/5f4ebec508c5f94b10854888")
      .set("x-api-key", "test")
      .send(body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("stateId");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
    expect(res.body).toHaveProperty("__v");
  });

  it("dont should update city with invalid body", async () => {
    city.update.mockImplementation(() => {
      throw new Error("Test error");
    });
    const body = {
      username: "5f4ebec508c5f94b10854886",
    };

    const res = await request(app)
      .patch("/city/5f4ebec508c5f94b10854888")
      .set("x-api-key", "test")
      .send(body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("dont should update city without x-api-key", async () => {
    const body = {};

    const res = await request(app)
      .patch("/city/5f4ebec508c5f94b10854888")
      .send(body);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

describe("Get Endpoint", () => {
  it("should get citys with s in name with sucess", async () => {
    city.read.mockResolvedValue([
      {
        _id: "5f4ebec508c5f94b10854888",
        name: "Amazonas",
        stateId: "5f4ebec508c5f94b10854886",
        createdAt: "2020-09-01T21:36:05.288Z",
        updatedAt: "2020-09-01T21:36:05.288Z",
        __v: 0,
      },
      {
        _id: "5f4ebec508c5f94b10854887",
        name: "Espirito Santo",
        stateId: "ES",
        createdAt: "2020-09-01T21:36:05.288Z",
        updatedAt: "2020-09-01T21:36:05.288Z",
        __v: 0,
      },
    ]);

    const query = { name: "s" };

    const res = await request(app)
      .get("/city")
      .set("x-api-key", "test")
      .query(query);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("length");
  });

  it("shouldn't take citys with invalid query", async () => {
    const query = { username: "s" };

    const res = await request(app)
      .get("/city")
      .set("x-api-key", "test")
      .query(query);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("shouldn't take citys without x-api-key", async () => {
    const query = { username: "s" };

    const res = await request(app).get("/city").query(query);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

describe("Get with Id Endpoint", () => {
  it("should get city with sucess", async () => {
    city.readById.mockResolvedValue({
      _id: "5f4ebec508c5f94b10854888",
      name: "Amazonas",
      stateId: "5f4ebec508c5f94b10854886",
      createdAt: "2020-09-01T21:36:05.288Z",
      updatedAt: "2020-09-01T21:36:05.288Z",
      __v: 0,
    });

    const res = await request(app)
      .get("/city/5f4ebec508c5f94b10854888")
      .set("x-api-key", "test");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("stateId");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
    expect(res.body).toHaveProperty("__v");
  });

  it("shouldn't take city with invalid id", async () => {
    city.readById.mockResolvedValue({});

    const res = await request(app).get("/city/test").set("x-api-key", "test");

    expect(res.status).toBe(200);
  });

  it("shouldn't take city without x-api-key", async () => {
    const body = {};

    const res = await request(app).get("/city/5f4ebec508c5f94b10854888");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

describe("Delete Endpoint", () => {
  it("should create city with sucess", async () => {
    city.remove.mockResolvedValue({});

    const res = await request(app)
      .delete("/city/5f4ebec508c5f94b10854888")
      .set("x-api-key", "test");
    expect(res.status).toBe(200);
  });

  it("shouldn't delete city city without x-api-key", async () => {
    const res = await request(app).delete("/city");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
