const request = require("supertest");

const app = require("./app");

describe("GET /", () => {

  it("returns a greeting", async () => {

    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);

    expect(res.text).toBe("Hello World");

  });

});

describe("GET /status", () => {

  it("reports healthy", async () => {

    const res = await request(app).get("/status");

    expect(res.statusCode).toBe(200);

    expect(res.body.status).toMatch(/healthy/);

  });

});

it("queues and dequeues in FIFO order", async () => {

  await request(app).post("/jobs").send({ task: "a" });

  await request(app).post("/jobs").send({ task: "b" });

  const first = await request(app).post("/jobs/next");

  expect(first.body.task).toBe("a");

});



