const request = require("supertest");
const { app } = require("../app");
const { state } = require("../db");

jest.mock("../db");

describe("Post Endpoint", () => {
  it("should create state with sucess", async () => {
    state.create.mockResolvedValue({
      _id: "5f4ebec508c5f94b10854888",
      name: "Amazonas",
      abbreviation: "AM",
      createdAt: "2020-09-01T21:36:05.288Z",
      updatedAt: "2020-09-01T21:36:05.288Z",
      __v: 0,
    });

    const body = {
      name: "Amazonas",
      abbreviation: "AM",
    };

    const res = await request(app)
      .post("/state")
      .set("x-api-key", "test")
      .send(body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("abbreviation");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
    expect(res.body).toHaveProperty("__v");
  });

  it("dont should create a new state with invalid body", async () => {
    state.create.mockImplementation(() => {
      throw new Error("Test error");
    });
    const body = {};

    const res = await request(app)
      .post("/state")
      .set("x-api-key", "test")
      .send(body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("dont should create a new state without x-api-key", async () => {
    const body = {};

    const res = await request(app).post("/state").send(body);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

describe("Patch Endpoint", () => {
  it("should update state with sucess", async () => {
    state.update.mockResolvedValue({
      _id: "5f4ebec508c5f94b10854888",
      name: "Amazonas",
      abbreviation: "AM",
      createdAt: "2020-09-01T21:36:05.288Z",
      updatedAt: "2020-09-01T21:36:05.288Z",
      __v: 0,
    });

    const body = {
      name: "Amazonas",
    };

    const res = await request(app)
      .patch("/state/5f4ebec508c5f94b10854888")
      .set("x-api-key", "test")
      .send(body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("abbreviation");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
    expect(res.body).toHaveProperty("__v");
  });

  it("dont should update state with invalid body", async () => {
    state.update.mockImplementation(() => {
      throw new Error("Test error");
    });
    const body = {
      username: "AM",
    };

    const res = await request(app)
      .patch("/state/5f4ebec508c5f94b10854888")
      .set("x-api-key", "test")
      .send(body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("dont should update state without x-api-key", async () => {
    const body = {};

    const res = await request(app)
      .patch("/state/5f4ebec508c5f94b10854888")
      .send(body);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

describe("Get Endpoint", () => {
  it("should get states with s in name with sucess", async () => {
    state.read.mockResolvedValue([
      {
        _id: "5f4ebec508c5f94b10854888",
        name: "Amazonas",
        abbreviation: "AM",
        createdAt: "2020-09-01T21:36:05.288Z",
        updatedAt: "2020-09-01T21:36:05.288Z",
        __v: 0,
      },
      {
        _id: "5f4ebec508c5f94b10854887",
        name: "Espirito Santo",
        abbreviation: "ES",
        createdAt: "2020-09-01T21:36:05.288Z",
        updatedAt: "2020-09-01T21:36:05.288Z",
        __v: 0,
      },
    ]);

    const query = { name: "s" };

    const res = await request(app)
      .get("/state")
      .set("x-api-key", "test")
      .query(query);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("length");
  });

  it("shouldn't take states with invalid query", async () => {
    const query = { username: "s" };

    const res = await request(app)
      .get("/state")
      .set("x-api-key", "test")
      .query(query);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  it("shouldn't take states without x-api-key", async () => {
    const query = { username: "s" };

    const res = await request(app).get("/state").query(query);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

describe("Get with Id Endpoint", () => {
  it("should get state with sucess", async () => {
    state.readById.mockResolvedValue({
      _id: "5f4ebec508c5f94b10854888",
      name: "Amazonas",
      abbreviation: "AM",
      createdAt: "2020-09-01T21:36:05.288Z",
      updatedAt: "2020-09-01T21:36:05.288Z",
      __v: 0,
    });

    const res = await request(app)
      .get("/state/5f4ebec508c5f94b10854888")
      .set("x-api-key", "test");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("abbreviation");
    expect(res.body).toHaveProperty("createdAt");
    expect(res.body).toHaveProperty("updatedAt");
    expect(res.body).toHaveProperty("__v");
  });

  it("shouldn't take state with invalid id", async () => {
    state.readById.mockResolvedValue({});

    const res = await request(app).get("/state/test").set("x-api-key", "test");

    expect(res.status).toBe(200);
  });

  it("shouldn't take state without x-api-key", async () => {
    const body = {};

    const res = await request(app).get("/state/5f4ebec508c5f94b10854888");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});

describe("Delete Endpoint", () => {
  it("should create state with sucess", async () => {
    state.remove.mockResolvedValue({});

    const res = await request(app)
      .delete("/state/5f4ebec508c5f94b10854888")
      .set("x-api-key", "test");
    expect(res.status).toBe(200);
  });

  it("shouldn't delete state state without x-api-key", async () => {
    const res = await request(app).delete("/state");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
