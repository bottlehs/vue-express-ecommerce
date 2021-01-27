const request = require('supertest');
const app = require('../../server.jest');
require("../routes/products.options.routes")(app);

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

describe("testing-server-products.options-routes", () => {
  it("GET /api/products/options - success", async (done) => {
    const response = await request(app).get("/api/products/options");
    expect(response.statusCode).toEqual(200);
    done();
  });
});