const request = require("supertest");
const app = require("../app");

/* jest.mock("../../middleware/error-handler", () =>
  jest.fn((e, req, res, next) => {
    res.status(400).json({ statusCode: 400, message: "" });
  })
);
jest.mock("../../services"); */

describe("Post Endpoint", () => {
  it("should create city with sucess", async () => {
    /* function.mockResolvedValue({
      answer: {
        orderId: "teste",
        paymentURL: "teste",
        paymentOrderStatus: "teste",
        paymentOrderId: "teste",
        merchantComment: "teste"
      }
    });
    function.mockResolvedValue({
      id: "teste",
      amount: 1
    });
    const body = {
      amount: 1,
      description: "teste"
    }; */
    const res = await request(app).post("/v1/payment/link").send(body);
    /* expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("paymentUrl");
    expect(res.body).toHaveProperty("id");

    expect(res.body).toHaveProperty("description");

    expect(res.body).toHaveProperty("amount"); */
  });

  it("should create a new post with invalid body", async () => {
    /* function.mockImplementation(() => {
      throw new Error("Test error");
    });
    const body = {};
 */
    await request(app).post("/v1/payment/link").send(body);
    expect(errorHandler).toHaveBeenCalled();
  });
});
