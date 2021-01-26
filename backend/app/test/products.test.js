const request = require('supertest');
const app = require('../../server.jest');
require("../routes/products.routes")(app);

jest.mock("./save_json", () => ({
  save: jest.fn(),
}));

jest.mock("./usStates.json", () => [
  {
    state: "MI",
    capital: "Lansing",
    governor: "Gretchen Whitmer",
  },
  {
    state: "GA",
    capital: "Atlanta",
    governor: "Brian Kemp",
  },
]);

describe("testing-server-products-routes", () => {
  it("GET /api/products - success", async (done) => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toEqual(200);
    done();
  });
});